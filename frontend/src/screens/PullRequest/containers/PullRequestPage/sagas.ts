import {
  fetchMyPullRequestsRoutine,
  editPrRoutine,
  closePrRoutine,
  acceptPrRoutine,
  fetchPrRoutine, sendCommentPrRoutine, editPrCommentRoutine
}
  from '../../routines/index';
import { toastr } from 'react-redux-toastr';
import { all, takeEvery, put, call } from 'redux-saga/effects';
import pullRequestService from '../../services';
import { history } from '@helpers/history.helper';

function* fetchPR(action) {
  try {
    const response = yield call(pullRequestService.getPR, action.payload);
    yield put(fetchPrRoutine.success(response));
  } catch (error) {
    yield put(fetchPrRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  }
}

function* putClosedPR(action) {
  try {
    const response = yield call(pullRequestService.putClosedPR, action.payload.id);
    yield put(closePrRoutine.success(response));
    toastr.success('Success', 'Pull request is closed');
  } catch (error) {
    yield put(closePrRoutine.failure(error?.message));
    toastr.error('Error', 'Sending data failed');
  } finally {
    yield put(closePrRoutine.fulfill());
  }
}

function* putAcceptedPR(action) {
  try {
    const response = yield call(pullRequestService.putAcceptedPR, action.payload.id);
    yield put(acceptPrRoutine.success(response));
    toastr.success('Success', 'Pull request is accepted');
    history.push(`/post/${action.payload.post.id}`);
  } catch (error) {
    yield put(acceptPrRoutine.failure(error?.message));
    toastr.error('Error', 'Sending data failed');
  } finally {
    yield put(acceptPrRoutine.fulfill());
  }
}

function* postEditedPR(action) {
  try {
    const response = yield call(pullRequestService.postEditedPR, action.payload);
    yield put(editPrRoutine.success(response));
    toastr.success('Success', 'Pull request is saved');
    history.push(`/pullRequest/${action.payload.id}`);
  } catch (error) {
    yield put(editPrRoutine.failure(error?.message));
    toastr.error('Error', 'Sending data failed');
  } finally {
    yield put(editPrRoutine.fulfill());
  }
}

function* fetchMyPRs(action) {
  try {
    const response = yield call(pullRequestService.fetchMyPRs, action.payload);
    yield put(fetchMyPullRequestsRoutine.success(response));
  } catch (error) {
    yield put(fetchMyPullRequestsRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  } finally {
    yield put(fetchMyPullRequestsRoutine.fulfill());
  }
}

function* sendCommentToPr(action) {
  try {
    const response = yield call(pullRequestService.sendCommentToPr, action.payload);
    yield put(sendCommentPrRoutine.success(response));
    toastr.success('Success', 'Comment to PR was send');
  } catch (error) {
    yield put(sendCommentPrRoutine.failure(error?.message));
    toastr.error('Error', 'Comment to PR failed');
  }
}

function* sendEditPrComment(action) {
  try {
    const response = yield call(pullRequestService.editPrComment, action.payload);
    const editPrComment = {
      response,
      editText: action.payload.text,
      id: action.payload.prCommentId
    };
    yield put(editPrCommentRoutine.success(editPrComment));
  } catch (error) {
    yield put(editPrCommentRoutine.failure(error?.message));
  }
}

function* watchGetPrRequest() {
  yield takeEvery(fetchPrRoutine.TRIGGER, fetchPR);
}

function* watchClosePrRequest() {
  yield takeEvery(closePrRoutine.TRIGGER, putClosedPR);
}

function* watchAcceptPrRequest() {
  yield takeEvery(acceptPrRoutine.TRIGGER, putAcceptedPR);
}

function* watchEditPrRequest() {
  yield takeEvery(editPrRoutine.TRIGGER, postEditedPR);
}

function* watchFetchMyPullRequestsRequest() {
  yield takeEvery(fetchMyPullRequestsRoutine.TRIGGER, fetchMyPRs);
}

function* watchSendCommentToPrRequest() {
  yield takeEvery(sendCommentPrRoutine, sendCommentToPr);
}

function* watchSendEditPrComment() {
  yield takeEvery(editPrCommentRoutine, sendEditPrComment);
}

export default function* pullRequestPageSagas() {
  yield all([
    watchGetPrRequest(),
    watchClosePrRequest(),
    watchAcceptPrRequest(),
    watchEditPrRequest(),
    watchFetchMyPullRequestsRequest(),
    watchSendCommentToPrRequest(),
    watchSendEditPrComment()
  ]);
}
