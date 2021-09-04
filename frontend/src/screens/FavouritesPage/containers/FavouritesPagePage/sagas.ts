import { all, call, put, takeEvery } from 'redux-saga/effects';
import { favouritesPageService } from '@screens/FavouritesPage/service';
import {
  deleteFavouritePostRoutine,
  fetchFavouritePostsRoutine,
  saveFavouritePostRoutine
} from '@screens/FavouritesPage/routines';
import { toastr } from 'react-redux-toastr';

function* fetchFavouritePosts(action) {
  try {
    const response = yield call(favouritesPageService.getFavouritesPosts, action.payload);
    yield put(fetchFavouritePostsRoutine.success(response));
  } catch (error) {
    yield put(fetchFavouritePostsRoutine.failure(error?.message));
    toastr.error('Error', 'Loading failed!');
  }
}

function* saveFavouritePost(action) {
  try {
    const response = yield call(favouritesPageService.saveFavouritePost, action.payload);
    yield put(saveFavouritePostRoutine.success(response));
  } catch (error) {
    yield put(saveFavouritePostRoutine.failure(error?.message));
    toastr.error('Error', 'Saving failed');
  }
}

function* deleteFavouritePost(action) {
  try {
    const response = yield call(favouritesPageService.deleteFavouritePost, action.payload);
    yield put(deleteFavouritePostRoutine.success(response));
    toastr.success('Success', 'Post removed');
  } catch (error) {
    yield put(deleteFavouritePostRoutine.failure(error?.message));
    toastr.error('Error', 'Deleting failed');
  }
}

function* watchFetchFavouritePosts() {
  yield takeEvery(fetchFavouritePostsRoutine.TRIGGER, fetchFavouritePosts);
}

function* watchSaveFavouritePost() {
  yield takeEvery(saveFavouritePostRoutine.TRIGGER, saveFavouritePost);
}

function* watchDeleteFavouritePost() {
  yield takeEvery(deleteFavouritePostRoutine.TRIGGER, deleteFavouritePost);
}

export default function* favouritesPagePageSagas() {
  yield all([
    watchFetchFavouritePosts(),
    watchSaveFavouritePost(),
    watchDeleteFavouritePost()
  ]);
}
