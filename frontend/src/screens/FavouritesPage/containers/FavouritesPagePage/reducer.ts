import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '@screens/FeedPage/models/IPost';
import {
  deleteFavouritePostRoutine,
  fetchFavouritePostsRoutine,
  saveFavouritePostRoutine,
  setLoadMorePostsRoutine
} from '@screens/FavouritesPage/routines';
import { isEmptyArray } from 'formik';

export interface IFavouritesPageReducerState {
  favouritePosts: IPost[];
  hasMore: boolean;
  loadMore: boolean;
}

const initialState: IFavouritesPageReducerState = {
  favouritePosts: undefined,
  hasMore: true,
  loadMore: false
};

export const favouritesPageReducer = createReducer(initialState, {
  [fetchFavouritePostsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPost[]>) => {
    if (!state.loadMore) {
      state.favouritePosts = payload;
    } else {
      state.favouritePosts = state.favouritePosts.concat(payload);
    }
    state.hasMore = !isEmptyArray(payload);
  },
  [setLoadMorePostsRoutine.TRIGGER]: (state, { payload }: PayloadAction<boolean>) => {
    state.loadMore = payload;
  },
  [deleteFavouritePostRoutine.SUCCESS]: (state, action) => {
    state.favouritePosts = state.favouritePosts.filter(hs => hs.id !== action.payload);
  }
});
