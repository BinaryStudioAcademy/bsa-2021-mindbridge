import { all, call, put, takeEvery } from 'redux-saga/effects';
import feedPageService from '@screens/FeedPage/services/feedPage';
import { toastr } from 'react-redux-toastr';
import {disLikePostRoutine, fetchDataRoutine, likePostRoutine} from '@screens/FeedPage/routines';

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
    const post = {
      response,
      likeQuantity: response?.id ? 1 : -1,
      postId: action.payload.postId,
      reactionStatus: action.payload.liked
    };
    yield put(likePostRoutine.success(post));
    toastr.success('Success', 'You liked the post');
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
    toastr.success('Success', 'You dislike the post');
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
