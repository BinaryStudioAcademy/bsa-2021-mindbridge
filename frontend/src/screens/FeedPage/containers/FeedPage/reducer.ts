import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { addMorePostsRoutine, disLikePostRoutine, fetchDataRoutine, likePostRoutine } from '@screens/FeedPage/routines';
import { IPost } from '@screens/FeedPage/models/IPost';
import { IPostList } from '@screens/FeedPage/models/IPostList';
import { isEmptyArray } from 'formik';

export interface IFeedPageReducerState {
  posts: [IPost];
  hasMore: boolean;
  loadMore: boolean;
}

const initialState: IFeedPageReducerState = {
  posts: [{
    id: '',
    title: '',
    text: '',
    authorName: '',
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
  [addMorePostsRoutine.TRIGGER]: state => {
    state.loadMore = true;
  },
  [likePostRoutine.SUCCESS]: (state, action) => {
    // state.posts.map(post => (post.id !== action.payload.postId ? post : post
    // ));
    const { response } = action.payload;
    const post = state.posts.find(p => p.id === action.payload.postId);
    if (action.payload.reactionStatus === true) {
      if (response === null || response.isFirstReaction === true) {
        post.likesCount += action.payload.likeQuantity;
        post.postRating += action.payload.likeQuantity;
      } else {
        post.disLikesCount -= 1;
        post.postRating += 1;
        post.postRating += action.payload.likeQuantity;
        post.likesCount += action.payload.likeQuantity;
      }
    } else if (response === null || response.isFirstReaction === true) {
      post.disLikesCount += action.payload.likeQuantity;
      post.postRating -= action.payload.likeQuantity;
    } else {
      post.likesCount -= 1;
      post.postRating -= 1;
      post.disLikesCount += action.payload.likeQuantity;
      post.postRating -= action.payload.likeQuantity;
    }
  },
  [disLikePostRoutine.SUCCESS]: (state, action) => {
    // const { disLikeResponse } = action.payload;
    // if (disLikeResponse === null || response.isFirstReaction === true) {
    //   const p = state.posts.find(post => post.id === action.payload.postId);
    //   p.disLikesCount += action.payload.likeQuantity;
    // } else {
    //   const p = state.posts.find(post => post.id === action.payload.postId);
    //   p.likesCount -= 1;
    //   p.disLikesCount += action.payload.likeQuantity;
    // }
  }
});
