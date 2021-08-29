import { all, call, put, takeEvery } from 'redux-saga/effects';
import postVersionService from '@screens/PostVersionPage/services';
import { fetchPostVersionRoutine } from '@screens/PostVersionPage/routines';
import { toastr } from 'react-redux-toastr';

function* fetchPostVersion(action) {
  try {
    const response = yield call(postVersionService.getVersion, action.payload);
    yield put(fetchPostVersionRoutine.success(response));
  } catch (error) {
    yield put(fetchPostVersionRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  }
}

function* watchGetPostVersionRequest() {
  yield takeEvery(fetchPostVersionRoutine.TRIGGER, fetchPostVersion);
}

export default function* postVersionPageSagas() {
  yield all([
    watchGetPostVersionRequest()
  ]);
}
