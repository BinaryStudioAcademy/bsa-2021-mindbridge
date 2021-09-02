import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '@screens/FeedPage/models/IPost';
import { fetchFavouritePostsRoutine } from '@screens/FavouritesPage/routines';

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
    state.favouritePosts = payload;
  }
});
