import { all, call, put, takeEvery } from 'redux-saga/effects';
import feedPageService from '@screens/FeedPage/services/feedPage';
import { toastr } from 'react-redux-toastr';
import { disLikePostRoutine, fetchDataRoutine, likePostRoutine } from '@screens/FeedPage/routines';

function* fetchData(filter) {
  console.log(filter);
  try {
    let response;
    switch (filter.payload.filter) {
      case 'hots':
        response = yield call(feedPageService.getHotPosts, filter.payload.params);
        break;
      case 'bests':
        response = yield call(feedPageService.getBestPosts, filter.payload.params);
        break;
      case '':
        response = yield call(feedPageService.getData, filter.payload.params);
        break;
      default: break;
    }
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

function* watchGetDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

function* watchLikePost() {
  yield takeEvery(likePostRoutine.TRIGGER, likePost);
}

function* watchDisLikePost() {
  yield takeEvery(disLikePostRoutine.TRIGGER, disLikePost);
}
export default function* feedPageSagas() {
  yield all([
    watchGetDataRequest(),
    watchLikePost(),
    watchDisLikePost()
  ]);
}
