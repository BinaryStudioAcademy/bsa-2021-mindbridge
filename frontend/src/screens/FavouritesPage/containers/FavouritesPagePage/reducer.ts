import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IPostFeed } from '@screens/FeedPage/models/IPostFeed';
import {
  deleteFavouritePostRoutine,
  fetchFavouritePostsRoutine,
  setLoadMorePostsRoutine
} from '@screens/FavouritesPage/routines';
import { isEmptyArray } from 'formik';

export interface IFavouritesPageReducerState {
  favouritePosts: IPostFeed[];
  hasMore: boolean;
  loadMore: boolean;
}

const initialState: IFavouritesPageReducerState = {
  favouritePosts: undefined,
  hasMore: true,
  loadMore: false
};

export const favouritesPageReducer = createReducer(initialState, {
  [fetchFavouritePostsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPostFeed[]>) => {
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
    if (state.favouritePosts) {
      state.favouritePosts = state.favouritePosts.filter(hs => hs.id !== action.payload);
    }
  }
});
