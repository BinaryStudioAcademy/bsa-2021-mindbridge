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
    authorName: 'Nolan Saris',
    tags: [{ id: '', name: '' }],
    createdAt: ''
  }
};

export const viewPostReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPost>) => {
    state.posts = payload;
  }
});
