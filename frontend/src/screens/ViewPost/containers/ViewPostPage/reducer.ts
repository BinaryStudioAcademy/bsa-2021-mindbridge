import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '@screens/ViewPost/models/IPost';
import { fetchDataRoutine } from '@screens/ViewPost/routines';

export interface IViewPostReducerState {
  posts: IPost;
}

const initialState: IViewPostReducerState = {
  posts: {
    id: '',
    title: '',
    text: '',
    rating: 0,
    tags: [],
    createdAt: '',
    author: { id: '', firstName: '', lastName: '', avatar: '' }
  }
};

export const viewPostReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPost>) => {
    state.posts = payload;
  }
});
