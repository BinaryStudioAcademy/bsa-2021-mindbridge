import { createReducer, PayloadAction } from '@reduxjs/toolkit';
/* import { addMorePostsRoutine, fetchDataRoutine, likePostRoutine, resetDataRoutine } from '@screens/FeedPage/routines';*/
import {
  addMorePostsRoutine,
  fetchDataRoutine,
  likePostRoutine,
  loadCountResultsRoutine, resetDataRoutine,
  searchPostsRoutine
} from '@screens/FeedPage/routines';
import { IPost } from '@screens/FeedPage/models/IPost';
import { IPostList } from '@screens/FeedPage/models/IPostList';
import { isEmptyArray } from 'formik';

export interface IFeedPageReducerState {
  posts: IPost[];
  hasMore: boolean;
  loadMore: boolean;
  countResults: number;
}

const initialState: IFeedPageReducerState = {
  /* posts: [],
  hasMore: false,*/
  posts: [{
    id: '',
    title: '',
    text: '',
    authorId: '',
    authorName: '',
    nickname: '',
    commentsCount: 0,
    likesCount: 0,
    disLikesCount: 0,
    tags: [{ id: '', name: '' }],
    createdAt: '',
    postRating: 0,
    avatar: '',
    coverImage: '',
    markdown: false
  }],
  countResults: 0,
  hasMore: true,
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
  }
});
