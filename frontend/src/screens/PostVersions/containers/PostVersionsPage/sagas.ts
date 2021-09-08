import { fetchPrsOfMyPostsRoutine,
  fetchOpenPostContributionsRoutine,
  fetchPostContributionsRoutine,
  fetchPostTitleRoutine
} from '../../routines/index';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import postVersionService from '@screens/PostVersions/services/postVersion';
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

function* fetchOpenPostContributions({ payload }: Routine<any>) {
  try {
    const response = yield call(postVersionService.getOpenPostContributions, payload);
    yield put(fetchOpenPostContributionsRoutine.success(response));
  } catch (e) {
    yield put(fetchOpenPostContributionsRoutine.failure(e?.message));
    toastr.error('Error', 'Loading post contributions failed!');
  }
}

function* fetchMyPostsContributions({ payload }: Routine<any>) {
  try {
    const response = yield call(postVersionService.getMyPostsContributions, payload);
    yield put(fetchPrsOfMyPostsRoutine.success(response));
  } catch (e) {
    yield put(fetchPrsOfMyPostsRoutine.failure(e?.message));
    toastr.error('Error', 'Loading contributions failed!');
  }
}

function* watchFetchOpenPostContributions() {
  yield takeEvery(fetchOpenPostContributionsRoutine.TRIGGER, fetchOpenPostContributions);
}

function* watchFetchPostContributions() {
  yield takeEvery(fetchPostContributionsRoutine.TRIGGER, fetchPostContributions);
}

function* watchFetchPostTitle() {
  yield takeEvery(fetchPostTitleRoutine.TRIGGER, fetchPostTitle);
}

function* watchFetchMyPostsContributions() {
  yield takeEvery(fetchPrsOfMyPostsRoutine.TRIGGER, fetchMyPostsContributions);
}

export default function* postVersionsPageSagas() {
  yield all([
    watchFetchPostTitle(),
    watchFetchPostContributions(),
    watchFetchOpenPostContributions(),
    watchFetchMyPostsContributions()
  ]);
}
