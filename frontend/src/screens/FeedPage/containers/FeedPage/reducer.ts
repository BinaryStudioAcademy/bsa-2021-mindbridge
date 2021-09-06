import { createReducer, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line max-len
/* import { addMorePostsRoutine, fetchDataRoutine, likePostRoutine, resetDataRoutine } from '@screens/FeedPage/routines';*/
import {
  addMorePostsRoutine,
  fetchDataRoutine,
  likePostRoutine,
  loadCountResultsRoutine, resetDataRoutine,
  searchPostsRoutine
} from '@screens/FeedPage/routines';
import { IPostFeed } from '@screens/FeedPage/models/IPostFeed';
import { IPostList } from '@screens/FeedPage/models/IPostList';
import { isEmptyArray } from 'formik';
import { deleteFavouritePostRoutine, saveFavouritePostRoutine } from '@screens/FavouritesPage/routines';

export interface IFeedPageReducerState {
  posts: IPostFeed[];
  hasMore: boolean;
  loadMore: boolean;
  countResults: number;
}

const initialState: IFeedPageReducerState = {
  posts: [],
  countResults: 0,
  hasMore: false,
  loadMore: false
};

export const feedPageReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPostList>) => {
    if (!state.loadMore) {
      state.posts = payload.posts;
    } else {
      payload.posts.map(post => state.posts.push(post));
    }
    state.hasMore = !isEmptyArray(payload.posts);
  },
  [addMorePostsRoutine.TRIGGER]: (state, { payload }: PayloadAction<boolean>) => {
    state.loadMore = payload;
  },
  [searchPostsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPostList>) => {
    if (!state.loadMore) {
      state.posts = payload.posts;
    } else {
      payload.posts.map(post => state.posts.push(post));
    }
    state.hasMore = !isEmptyArray(payload.posts);
  },
  [loadCountResultsRoutine.SUCCESS]: (state, { payload }: PayloadAction<number>) => {
    state.countResults = payload;
  },
  [likePostRoutine.SUCCESS]: (state, action) => {
    const { response, postId, reactionStatus } = action.payload;
    const post = state.posts.find(p => p.id === postId);
    if (reactionStatus === true) {
      if (response === null || response.isFirstReaction === true) {
        post.likesCount += action.payload.difference;
        post.postRating += action.payload.difference;
      } else {
        post.disLikesCount -= action.payload.difference;
        post.postRating += action.payload.difference;
        post.postRating += action.payload.difference;
        post.likesCount += action.payload.difference;
      }
    } else if (response === null || response.isFirstReaction === true) {
      post.disLikesCount += action.payload.difference;
      post.postRating -= action.payload.difference;
    } else {
      post.likesCount -= action.payload.difference;
      post.postRating -= action.payload.difference;
      post.disLikesCount += action.payload.difference;
      post.postRating -= action.payload.difference;
    }
  },
  [resetDataRoutine.TRIGGER]: state => {
    state.posts = initialState.posts;
    state.hasMore = false;
    state.loadMore = false;
    state.countResults = 0;
  },
  [saveFavouritePostRoutine.SUCCESS]: (state, action) => {
    if (state.posts) {
      state.posts.find(post => post.id === action.payload).isFavourite = true;
    }
  },
  [deleteFavouritePostRoutine.TRIGGER]: (state, action) => {
    if (state.posts) {
      state.posts.find(post => post.id === action.payload).isFavourite = false;
    }
  }
});
