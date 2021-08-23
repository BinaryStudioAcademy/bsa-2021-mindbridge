import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchPostVersionRoutine } from '@screens/PostVersionPage/routines';
import { IPostVersion } from '@screens/PostVersionPage/models/IPostVersion';
import { IUser } from '@screens/PullRequest/models/IUser';

export interface IPostVersionPageReducerState {
  postVersion: IPostVersion;
}

const initialState: IPostVersionPageReducerState = {
  postVersion: undefined
};

export const postVersionPageReducer = createReducer(initialState, {
  [fetchPostVersionRoutine.SUCCESS]: (state, action) => {
    state.postVersion = action.payload;
  }
});
