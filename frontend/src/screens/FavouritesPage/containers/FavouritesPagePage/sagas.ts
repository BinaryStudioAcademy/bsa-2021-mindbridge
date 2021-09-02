import { all, call, put, takeEvery } from 'redux-saga/effects';
import { favouritesPageService } from '@screens/FavouritesPage/service';
import { fetchFavouritePostsRoutine } from '@screens/FavouritesPage/routines';
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

function* watchFetchFavouritePosts() {
  yield takeEvery(fetchFavouritePostsRoutine.TRIGGER, fetchFavouritePosts);
}

export default function* favouritesPagePageSagas() {
  yield all([
    watchFetchFavouritePosts()
  ]);
}
