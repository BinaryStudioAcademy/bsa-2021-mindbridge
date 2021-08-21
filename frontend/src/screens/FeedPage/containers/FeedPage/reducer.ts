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
  }
});
