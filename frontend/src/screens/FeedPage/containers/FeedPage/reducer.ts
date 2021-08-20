import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { addMorePostsRoutine, fetchDataRoutine } from '@screens/FeedPage/routines';
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
    authorId: '',
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
  }
});
