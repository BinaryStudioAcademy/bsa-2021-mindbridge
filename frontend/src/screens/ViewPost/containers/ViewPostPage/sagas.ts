import { all, call, put, takeEvery } from 'redux-saga/effects';
import viewPageService from '@screens/ViewPost/services/viewPage';
import { toastr } from 'react-redux-toastr';
import { fetchDataRoutine } from '@screens/ViewPost/routines';

function* fetchData(action) {
  try {
    const response = yield call(viewPageService.getData, action.payload);
    yield put(fetchDataRoutine.success(response));
    toastr.success('Success', 'Data loaded');
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  }
}

function* watchDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

export default function* viewPostPageSagas() {
  yield all([
    watchDataRequest()
  ]);
}

