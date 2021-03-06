import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { favouritesPageReducer } from '@screens/FavouritesPage/containers/FavouritesPagePage/reducer';
import {
  deleteFavouritePostRoutine,
  fetchFavouritePostsRoutine,
  saveFavouritePostRoutine,
  setLoadMorePostsRoutine
} from '@screens/FavouritesPage/routines';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchFavouritePostsRequest: reducerCreator([fetchFavouritePostsRoutine.TRIGGER]),
  saveFavouritePostRequest: reducerCreator([saveFavouritePostRoutine.TRIGGER]),
  setLoadMorePostsRequest: reducerCreator([setLoadMorePostsRoutine.TRIGGER]),
  deleteFavouritePostRequest: reducerCreator([deleteFavouritePostRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: favouritesPageReducer
});

const reqs = (state: RootState) => state.favouritesPageReducer.requests;
const data = (state: RootState) => state.favouritesPageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchFavouritePostsLoading = state => reqs(state).fetchFavouritePostsRequest.loading;
