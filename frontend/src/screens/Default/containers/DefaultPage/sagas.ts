import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchDataRoutine } from '../../routines';
import defaultService from '@screens/Default/services/default.service';
import { toastr } from 'react-redux-toastr';

function* fetchData() {
  try {
    const response = yield call(defaultService.getData);
    yield put(fetchDataRoutine.success(response));
    toastr.success('Success', 'Data loaded!');
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading failed!');
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

export default function* defaultPageSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}
