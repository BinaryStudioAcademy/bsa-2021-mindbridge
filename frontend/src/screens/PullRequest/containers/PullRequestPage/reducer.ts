import { closePrRoutine, resetFailSendingDataRoutine } from './../../routines/index';
import { fetchPrRoutine } from '../../routines/index';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IPostPR } from '../../models/IPostPR';

export interface IPullRequestReducerState {
  postPR: IPostPR;
  failSendingData: boolean;
}

const initialState: IPullRequestReducerState = {
  postPR: {
    closed: false,
    contributor: { id: '', nickname: '', avatar: '' },
    coverImage: '',
    createdAt: '',
    deleted: false,
    id: '',
    markdown: false,
    post: {
      author: { id: '', nickname: '', avatar: '' },
      coverImage: '',
      id: '',
      markdown: false,
      text: '',
      title: '',
      tags: []
    },
    text: '',
    title: '',
    updatedAt: '',
    tags: []
  },
  failSendingData: false
};

export const pullRequestReducer = createReducer(initialState, {
  [fetchPrRoutine.SUCCESS]: (state, action) => {
    state.postPR = action.payload;
  },
  [closePrRoutine.FAILURE]: (state) => {
    state.failSendingData = true;
  },
  [resetFailSendingDataRoutine.TRIGGER]: (state) => {
    state.failSendingData = false;
  }
});
