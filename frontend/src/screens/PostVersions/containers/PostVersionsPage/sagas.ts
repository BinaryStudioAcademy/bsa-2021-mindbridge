import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import postVersionService from '@screens/PostVersions/services/postVersion';
import { fetchPostContributionsRoutine, fetchPostTitleRoutine } from '@screens/PostVersions/routines';
import { toastr } from 'react-redux-toastr';

function* fetchPostTitle({ payload }: Routine<any>) {
  try {
    const response = yield call(postVersionService.getPostTitle, payload);
    yield put(fetchPostTitleRoutine.success(response));
  } catch (e) {
    yield put(fetchPostTitleRoutine.failure(e?.message));
    toastr.error('Error', 'Loading post title failed!');
  }
}

function* fetchPostContributions({ payload }: Routine<any>) {
  try {
    const response = yield call(postVersionService.getPostContributions, payload);
    yield put(fetchPostContributionsRoutine.success(response));
  } catch (e) {
    yield put(fetchPostContributionsRoutine.failure(e?.message));
    toastr.error('Error', 'Loading post contributions failed!');
  }
}

function* watchFetchPostContributions() {
  yield takeEvery(fetchPostContributionsRoutine.TRIGGER, fetchPostContributions);
}

function* watchFetchPostTitle() {
  yield takeEvery(fetchPostTitleRoutine.TRIGGER, fetchPostTitle);
}

export default function* postVersionsPageSagas() {
  yield all([
    watchFetchPostTitle(),
    watchFetchPostContributions()
  ]);
}
