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
    coverImage: '',
    text: '',
    commentsCount: 0,
    rating: 0,
    tags: [{ id: '', name: '' }],
    createdAt: '',
    postRating: 0,
    avatar: '',
    markdown: false,
    author: { id: '', firstName: '', lastName: '', avatar: '' }
  }
};

export const viewPostReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPost>) => {
    state.post = payload;
  }
});
