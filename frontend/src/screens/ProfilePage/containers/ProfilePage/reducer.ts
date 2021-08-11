import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataRoutine } from '@screens/FeedPage/routines';
import { IPost } from '@screens/FeedPage/models/IPost';
import { IPostList } from '@screens/FeedPage/models/IPostList';

export interface IProfilePageReducerState {
   posts: [IPost];
}

const initialState: IProfilePageReducerState = {
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
  }]
};

export const profilePageReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPostList>) => {
    state.posts = payload.posts;
  }
});
