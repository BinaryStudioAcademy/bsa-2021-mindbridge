import { toastr } from 'react-redux-toastr';
import { fetchPrRoutine } from './../../routines/index';
import { all, takeEvery, put, call } from 'redux-saga/effects';
import pullRequestService from '../../services';

function* fetchPR(action) {
  try {
    console.log("saga")
    const response = yield call( pullRequestService.getPR, action.payload);
    console.log(response);
    yield put(fetchPrRoutine.success(response));
  } catch (error) {
    yield put(fetchPrRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  }
}

function* watchGetPrRequest() {
  yield takeEvery (fetchPrRoutine.TRIGGER, fetchPR);
}

export default function* pullRequestPageSagas() {
  yield all([
    watchGetPrRequest()
  ]);
}
