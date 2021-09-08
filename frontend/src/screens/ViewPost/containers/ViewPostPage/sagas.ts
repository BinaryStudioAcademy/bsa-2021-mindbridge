import { savePostViewRoutine } from '../../../Login/routines/index';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import viewPageService from '@screens/ViewPost/services/viewPage';
import { toastr } from 'react-redux-toastr';
import {
  fetchHighlightsRoutine,
  saveHighlightRoutine,
  fetchDataRoutine, leaveReactionOnCommentRoutine,
  leaveReactionOnPostViewPageRoutine, searchUserByNicknameRoutine,
  sendCommentRoutine,
  sendReplyRoutine, editCommentRoutine
} from '@screens/ViewPost/routines';
import feedPageService from '@screens/FeedPage/services/feedPage';
import { Routine } from 'redux-saga-routines';

function* fetchData(action) {
  try {
    const response = yield call(viewPageService.getData, action.payload);
    yield put(fetchDataRoutine.success(response));
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  }
}

function* fetchHighlights(action) {
  try {
    const response = yield call(viewPageService.getHighlights, action.payload);
    yield put(fetchHighlightsRoutine.success(response));
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  }
}

function* saveHighlight(action) {
  try {
    const response = yield call(viewPageService.saveHighlight, action.payload);
    yield put(saveHighlightRoutine.success(response));
    toastr.success('Success', 'Highlight saved');
  } catch (error) {
    yield put(saveHighlightRoutine.failure(error?.message));
    toastr.error('Error', 'Saving highlight failed');
  }
}

function* leaveReaction(action) {
  try {
    const response = yield call(feedPageService.likePost, action.payload);
    const postReaction = {
      response,
      difference: response?.id ? 1 : -1,
      reactionStatus: action.payload.liked
    };
    yield put(leaveReactionOnPostViewPageRoutine.success(postReaction));
  } catch (error) {
    yield put(leaveReactionOnPostViewPageRoutine.failure(error?.message));
    toastr.error('Error', 'You don\'t have the rights to do that');
  }
}

function* sendComment(action) {
  try {
    const response = yield call(viewPageService.sendComment, action.payload);
    yield put(sendCommentRoutine.success(response));
    toastr.success('Success', 'Comment was sent!');
  } catch (error) {
    yield put(sendCommentRoutine.failure(error?.message));
    toastr.error('Error', 'Comment send failed!');
  } finally {
    yield put(sendCommentRoutine.fulfill());
  }
}

function* sendReply(action) {
  try {
    const response = yield call(viewPageService.sendReply, action.payload);
    yield put(sendReplyRoutine.success(response));
    toastr.success('Success', 'Reply was sent');
  } catch (error) {
    yield put(sendReplyRoutine.failure(error?.message));
    toastr.error('Error', 'Reply send failed');
  } finally {
    yield put(sendReplyRoutine.fulfill());
  }
}

function* sendEditComment(actions) {
  try {
    const response = yield call(viewPageService.editComment, actions.payload);
    const editComment = {
      response,
      editText: actions.payload.text,
      id: actions.payload.commentId
    };
    yield put(editCommentRoutine.success(editComment));
    toastr.success('Success', 'Edit was sent');
  } catch (error) {
    toastr.error('Error', 'Edit send failed');
    yield put(editCommentRoutine.failure(error?.message));
  }
}

function* leaveCommentReaction(action) {
  try {
    const response = yield call(viewPageService.leaveReactionComment, action.payload);
    const commentReaction = {
      response,
      difference: response?.id ? 1 : -1,
      commentId: action.payload.commentId,
      reactionStatus: action.payload.liked
    };
    yield put(leaveReactionOnCommentRoutine.success(commentReaction));
  } catch (error) {
    yield put(leaveReactionOnCommentRoutine.failure(error?.message));
    toastr.error('Error', 'You don\'t have the rights to do that');
  }
}

function* searchUsersByNickname({ payload }: Routine<any>) {
  try {
    const params = {
      query: payload
    };
    const response = yield call(viewPageService.getUsersByNickname, params);
    const users = {
      users: response
    };
    yield put(searchUserByNicknameRoutine.success(users));
  } catch (error) {
    yield put(searchUserByNicknameRoutine.failure(error?.message));
  }
}

function* watchSearchUsersByNickname() {
  yield takeEvery(searchUserByNicknameRoutine, searchUsersByNickname);
}

function* watchLeaveCommentReaction() {
  yield takeEvery(leaveReactionOnCommentRoutine.TRIGGER, leaveCommentReaction);
}

function* watchSendCommentRequest() {
  yield takeEvery(sendCommentRoutine.TRIGGER, sendComment);
}

function* watchSendReplyRequest() {
  yield takeEvery(sendReplyRoutine.TRIGGER, sendReply);
}

function* watchDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

function* watchSaveHighlight() {
  yield takeEvery(saveHighlightRoutine.TRIGGER, saveHighlight);
}

function* watchFetchHighlights() {
  yield takeEvery(fetchHighlightsRoutine.TRIGGER, fetchHighlights);
}

function* watchLeaveReactionOnPost() {
  yield takeEvery(leaveReactionOnPostViewPageRoutine.TRIGGER, leaveReaction);
}

export function* savePostView(action: any) {
  try {
    const response = yield call(viewPageService.sendPostView, action.payload.view);
    yield put(savePostViewRoutine.success(response));
  } catch (ex) {
    yield put(savePostViewRoutine.failure(ex.message));
    toastr.error('Error', 'Send post view failed');
  }
}

function* watchSavePostView() {
  yield takeEvery(savePostViewRoutine.TRIGGER, savePostView);
}

function* watchSendEditComment() {
  yield takeEvery(editCommentRoutine.TRIGGER, sendEditComment);
}

export default function* viewPostPageSagas() {
  yield all([
    watchDataRequest(),
    watchLeaveReactionOnPost(),
    watchSaveHighlight(),
    watchFetchHighlights(),
    watchSendCommentRequest(),
    watchSendReplyRequest(),
    watchLeaveCommentReaction(),
    watchSearchUsersByNickname(),
    watchSavePostView(),
    watchSendEditComment()
  ]);
}

