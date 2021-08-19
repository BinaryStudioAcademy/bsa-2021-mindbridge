import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { getPostVersionsRoutine } from '@screens/PostVersions/routines';
import postVersionService from '@screens/PostVersions/services/postVersion';

export function* getPostVersions({ payload }: Routine<any>) {
  try {
    console.log(payload);
    const response = yield call(postVersionService.getPostVersions, payload);
    yield put(getPostVersionsRoutine.success(response));
  } catch (ex) {
    yield put(getPostVersionsRoutine.failure(ex.message));
  }
}

function* watchPostVersions() {
  yield takeEvery(getPostVersionsRoutine.TRIGGER, getPostVersions);
}

export default function* postVersionsPageSagas() {
  yield all([
    watchPostVersions()
  ]);
}
