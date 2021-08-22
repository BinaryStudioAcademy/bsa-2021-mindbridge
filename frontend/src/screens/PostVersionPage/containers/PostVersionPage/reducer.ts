import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchPostVersionRoutine } from '@screens/PostVersionPage/routines';
import { IPostVersion } from '@screens/PostVersionPage/models/IPostVersion';
import { IUser } from '@screens/PullRequest/models/IUser';

export interface IPostVersionPageReducerState {
  postVersion: IPostVersion;
}

const initialState: IPostVersionPageReducerState = {
  postVersion: {
    coverImage: '',
    createdAt: '',
    deleted: false,
    id: '',
    markdown: false,
    preVersion: {
      author: { id: '', nickname: '', avatar: '', lastName: '', firstName: '' },
      coverImage: '',
      id: '',
      markdown: false,
      text: '',
      title: '',
      tags: []
    },
    author: { id: '', nickname: '', avatar: '', lastName: '', firstName: '' },
    text: '',
    title: '',
    updatedAt: '',
    tags: []
  }
};

export const postVersionPageReducer = createReducer(initialState, {
  [fetchPostVersionRoutine.SUCCESS]: (state, action) => {
    state.postVersion = action.payload;
  }
});
