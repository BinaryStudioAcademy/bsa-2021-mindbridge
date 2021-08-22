import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchPostContributionsRoutine, fetchPostTitleRoutine } from '@screens/PostVersions/routines';
import { IContribution } from '@screens/ViewPost/models/IContribution';

export interface IPostVersionsReducerState {
  postTitle: string;
  postContributions: IContribution[];
}

const initialState: IPostVersionsReducerState = {
  postTitle: '',
  postContributions: []
};

export const postVersionsReducer = createReducer(initialState, {
  [fetchPostTitleRoutine.SUCCESS]: (state, { payload }: PayloadAction<string>) => {
    state.postTitle = payload;
  },
  [fetchPostContributionsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IContribution[]>) => {
    state.postContributions = payload;
  }
});
