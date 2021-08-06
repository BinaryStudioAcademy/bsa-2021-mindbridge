import { all, call, put, takeEvery } from 'redux-saga/effects';
// import createPostService from '@screens/CreatePost/services/createPost';
import { fetchDataRoutine } from '@screens/CreatePost/routines';
import { toastr } from 'react-redux-toastr';
import createPostService from '@screens/CreatePost/services/createPost';

function* fetchData() {
  try {
    const response = yield call(createPostService.getData);
    yield put(fetchDataRoutine.success(response));
    /* toastr.success('Success', 'Data loaded!');*/
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    /* toastr.error('Error', 'Loading failed!');*/
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
