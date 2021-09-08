import { call, put, takeEvery, all } from 'redux-saga/effects';
import postPageService from '@screens/PostPage/services/PostPage';
import { fetchUserProfileRoutine } from '@screens/PostPage/routines';

function* getCurrentUser(id) {
  try {
    const response = yield call(postPageService.getData, id.payload);
    yield put(fetchUserProfileRoutine.success(response));
  } catch (error) {
    yield put(fetchUserProfileRoutine.failure(error?.message));
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchUserProfileRoutine.TRIGGER, getCurrentUser);
}

export default function* privateRouteSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}
