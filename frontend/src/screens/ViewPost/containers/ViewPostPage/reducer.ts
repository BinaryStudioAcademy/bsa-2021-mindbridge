import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IData } from '@screens/ViewPost/models/IData';
import { IPost } from '@screens/ViewPost/models/IPost';
import { fetchDataRoutine } from '@screens/ViewPost/routines';

export interface IViewPostReducerState {
  posts: [IPost] ;
}

const initialState: IViewPostReducerState = {
  posts: [{
    id: '',
    title: '',
    text: '',
    authorName: '',
    tags: [{ id: '', name: '' }],
    createdAt: '',
    postRating: 0
  }]
};

export const viewPostReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IData>) => {
    state.posts = payload.posts;
  }
});
