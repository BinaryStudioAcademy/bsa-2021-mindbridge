import { closePrRoutine } from './../../routines/index';
import { toastr } from 'react-redux-toastr';
import { fetchPrRoutine } from '../../routines/index';
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
    const response = yield call(pullRequestService.putClosedPR, action.payload);
    yield put(closePrRoutine.success(response));
    throw new console.error();
    
    history.push(`/post/${response}`);
  } catch (error) {
    yield put(closePrRoutine.failure(error?.message));
    toastr.error('Error', 'Sending data failed');
  }
}

function* watchGetPrRequest() {
  yield takeEvery(fetchPrRoutine.TRIGGER, fetchPR);
}

function* watchClosePrRequest() {
  yield takeEvery(closePrRoutine.TRIGGER, putClosedPR);
}

export default function* pullRequestPageSagas() {
  yield all([
    watchGetPrRequest(),
    watchClosePrRequest()
  ]);
}
