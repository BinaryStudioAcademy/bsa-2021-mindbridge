import { createReducer } from '@reduxjs/toolkit';
import { fetchPostVersionRoutine } from '@screens/PostVersionPage/routines';
import { IPostVersion } from '@screens/PostVersionPage/models/IPostVersion';

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
