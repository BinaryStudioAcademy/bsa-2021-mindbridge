import { all, call, put, takeEvery } from 'redux-saga/effects';
import feedPageService from '@screens/FeedPage/services/feedPage';
import { toastr } from 'react-redux-toastr';
import {
  disLikePostRoutine,
  fetchAllUsersNumberRoutine,
  fetchDataRoutine,
  likePostRoutine,
  loadCountResultsRoutine,
  searchPostsRoutine
} from '@screens/FeedPage/routines';
import { Routine } from 'redux-saga-routines';

function* fetchData(filter) {
  try {
    const response = yield call(feedPageService.getData, filter.payload);
    const postsList = { posts: response };
    yield put(fetchDataRoutine.success(postsList));
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading failed!');
  }
}

function* likePost(action) {
  try {
    const response = yield call(feedPageService.likePost, action.payload);
    const postReaction = {
      response,
      difference: response?.id ? 1 : -1,
      postId: action.payload.postId,
      reactionStatus: action.payload.liked
    };
    yield put(likePostRoutine.success(postReaction));
  } catch (error) {
    yield put(likePostRoutine.failure(error?.message));
    toastr.error('Error', 'Like post failed');
  }
}

function* disLikePost(action) {
  try {
    const response = yield call(feedPageService.likePost, action.payload);
    const post = {
      response,
      disLikeQuantity: response?.id ? 1 : -1,
      postId: action.payload.postId,
      reactionStatus: action.payload.liked
    };
    yield put(disLikePostRoutine.success(post));
  } catch (error) {
    yield put(disLikePostRoutine.failure(error?.message));
    toastr.error('Error', 'Dislike post failed');
  }
}

function* searchPosts({ payload }: Routine<any>) {
  try {
    const response = yield call(feedPageService.searchPosts,
      { query: payload.query, from: payload.params.from, count: payload.params.count });
    yield put(searchPostsRoutine.success({ posts: response }));
  } catch (error) {
    yield put(searchPostsRoutine.failure(error?.message));
    toastr.error('Error', 'Search posts failed');
  }
}

function* loadCountResults({ payload }: Routine<any>) {
  try {
    const response = yield call(feedPageService.loadCountResults, payload);
    yield put(loadCountResultsRoutine.success(response));
  } catch (error) {
    yield put(loadCountResultsRoutine.failure(error?.message));
    toastr.error('Error', 'Load count of results failed');
  }
}

function* fetchAllUsersNumber() {
  try {
    const response = yield call(feedPageService.fetchAllUsersNumber);
    yield put(fetchAllUsersNumberRoutine.success(response));
  } catch (error) {
    yield put(fetchAllUsersNumberRoutine.failure(error?.message));
    toastr.error('Error', 'Load count of users failed');
  }
}

function* watchLoadCountResults() {
  yield takeEvery(loadCountResultsRoutine.TRIGGER, loadCountResults);
}

function* watchSearchPosts() {
  yield takeEvery(searchPostsRoutine.TRIGGER, searchPosts);
}

function* watchGetDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

function* watchLikePost() {
  yield takeEvery(likePostRoutine.TRIGGER, likePost);
}

function* watchDisLikePost() {
  yield takeEvery(disLikePostRoutine.TRIGGER, disLikePost);
}

function* watchFetchAllUsersNumber() {
  yield takeEvery(fetchAllUsersNumberRoutine.TRIGGER, fetchAllUsersNumber);
}

export default function* feedPageSagas() {
  yield all([
    watchGetDataRequest(),
    watchLikePost(),
    watchDisLikePost(),
    watchSearchPosts(),
    watchLoadCountResults(),
    watchFetchAllUsersNumber()
  ]);
}
