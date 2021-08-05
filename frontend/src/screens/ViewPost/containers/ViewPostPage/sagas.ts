import { all, call, put, takeEvery } from 'redux-saga/effects';
import viewPageService from '@screens/ViewPost/services/viewPage';
import { toastr } from 'react-redux-toastr';
import { fetchDataRoutine } from '@screens/ViewPost/routines';

function* fetchData() {
  try {
    const response = yield call(viewPageService.getData);
    const postData = { posts: response };
    yield put(fetchDataRoutine.success(postData));
    toastr.success('Success', 'Data loaded');
    console.log(postData);
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

