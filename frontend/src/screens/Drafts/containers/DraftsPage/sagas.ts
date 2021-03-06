import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { fetchDraftsRoutine } from '@screens/Drafts/routines';
import { toastr } from 'react-redux-toastr';
import draftsService from '@screens/Drafts/services/Drafts';

function* fetchDrafts({ payload }: Routine<any>) {
  try {
    if (payload.draftsOnly) {
      const response = yield call(draftsService.fetchDrafts, payload.userId);
      yield put(fetchDraftsRoutine.success(response));
    } else {
      const response = yield call(draftsService.fetchMyPosts, payload.userId);
      yield put(fetchDraftsRoutine.success(response));
    }
  } catch (e) {
    yield put(fetchDraftsRoutine.failure(e?.message));
    toastr.error('Error', 'Loading drafts failed');
  }
}

function* watchFetchDrafts() {
  yield takeEvery(fetchDraftsRoutine.TRIGGER, fetchDrafts);
}

export default function* draftsPageSagas() {
  yield all([
    watchFetchDrafts()
  ]);
}
