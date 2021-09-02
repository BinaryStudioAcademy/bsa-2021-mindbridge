import { IPostPR } from '../../../PullRequest/models/IPostPR';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchMyPullRequestsRoutine } from '@root/screens/PullRequest/routines';
import {
  fetchOpenPostContributionsRoutine,
  fetchPostContributionsRoutine,
  fetchPostTitleRoutine
} from '@screens/PostVersions/routines';
import { IContribution } from '@screens/ViewPost/models/IContribution';

export interface IPostVersionsReducerState {
  postTitle: string;
  postContributions: IContribution[];
  authorContributions: IPostPR[];
}

const initialState: IPostVersionsReducerState = {
  postTitle: '',
  postContributions: [],
  authorContributions: []
};

export const postVersionsReducer = createReducer(initialState, {
  [fetchPostTitleRoutine.SUCCESS]: (state, { payload }: PayloadAction<string>) => {
    state.postTitle = payload;
  },
  [fetchPostContributionsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IContribution[]>) => {
    state.postContributions = payload;
  },
  [fetchOpenPostContributionsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IContribution[]>) => {
    state.postContributions = payload;
  },
  [fetchMyPullRequestsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPostPR[]>) => {
    state.authorContributions = payload;
  }
});
