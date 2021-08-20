import { closePrRoutine, acceptPrRoutine, fetchPrRoutine } from '../../routines/index';
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
    history.push(`/post/${action.payload.post.id}`);
  } catch (error) {
    yield put(acceptPrRoutine.failure(error?.message));
    toastr.error('Error', 'Sending data failed');
  } finally {
    yield put(acceptPrRoutine.fulfill());
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

export default function* pullRequestPageSagas() {
  yield all([
    watchGetPrRequest(),
    watchClosePrRequest(),
    watchAcceptPrRequest()
  ]);
}
