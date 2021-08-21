import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchPostTitleRoutine } from '@screens/PostVersions/routines';

export interface IPostVersionsReducerState {
  postTitle: string;
}

const initialState: IPostVersionsReducerState = {
  postTitle: ''
};

export const postVersionsReducer = createReducer(initialState, {
  [fetchPostTitleRoutine.SUCCESS]: (state, { payload }: PayloadAction<string>) => {
    state.postTitle = payload;
  }
});
