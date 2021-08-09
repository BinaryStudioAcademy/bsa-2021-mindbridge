import { all, call, put, takeEvery } from 'redux-saga/effects';
// import createPostService from '@screens/CreatePost/services/createPost';
import { fetchDataRoutine, getPostVersionsRoutine } from '@screens/CreatePost/routines';
import { toastr } from 'react-redux-toastr';
import createPostService from '@screens/CreatePost/services/createPost';

function* fetchData() {
  try {
    const response = yield call(createPostService.getData);
    yield put(fetchDataRoutine.success(response));
    toastr.success('Success', 'Data loaded!');
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading failed!');
  }
}

export function* getPostVersions() {
  try {
    const response = yield call(createPostService.getPostVersions);
    yield put(getPostVersionsRoutine.success(response));
  } catch (ex) {
    yield put(getPostVersionsRoutine.failure(ex.message));
  }
}

function* watchPostVersions() {
  yield takeEvery(getPostVersionsRoutine.TRIGGER, getPostVersions);
}

function* watchGetDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

export default function* defaultPageSagas() {
  yield all([
    watchGetDataRequest(),
    watchPostVersions()
  ]);
}
