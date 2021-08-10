import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataRoutine } from '@screens/ViewPost/routines';
import { IPost } from '../../models/IPost';

export interface IViewPostReducerState {
  post: IPost;
}

const initialState: IViewPostReducerState = {
  post: {
    id: '',
    title: '',
    text: '',
    authorName: '',
    commentsCount: 0,
    rating: 0,
    tags: [{ id: '', name: '' }],
    createdAt: '',
    postRating: 0,
    avatar: '',
    coverImage: '',
    markdown: false
  }
};

export const viewPostReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPost>) => {
    state.post = payload;
  }
});
