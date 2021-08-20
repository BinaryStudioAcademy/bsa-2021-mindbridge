import { acceptPrRoutine, closePrRoutine, resetEndSendingDataRoutine } from './../../routines/index';
import { fetchPrRoutine } from '../../routines/index';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IPostPR } from '../../models/IPostPR';

export interface IPullRequestReducerState {
  postPR: IPostPR;
  endSendingData: boolean;
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
  endSendingData: false
};

export const pullRequestReducer = createReducer(initialState, {
  [fetchPrRoutine.SUCCESS]: (state, action) => {
    state.postPR = action.payload;
  },
  [closePrRoutine.FULFILL]: (state) => {
    state.endSendingData = true;
  },
  [acceptPrRoutine.FULFILL]: (state) => {
    state.endSendingData = true;
  },
  [resetEndSendingDataRoutine.TRIGGER]: (state) => {
    state.endSendingData = false;
  }
});
