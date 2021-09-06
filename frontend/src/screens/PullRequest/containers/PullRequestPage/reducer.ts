import { acceptPrRoutine, closePrRoutine, resetEndSendingDataRoutine, fetchPrRoutine } from '../../routines/index';
import { createReducer } from '@reduxjs/toolkit';
import { IPostPR, PrState } from '../../models/IPostPR';

export interface IPullRequestReducerState {
  postPR: IPostPR;
  endSendingData: boolean;
}

const initialState: IPullRequestReducerState = {
  postPR: {
    state: PrState.closed,
    contributor: { id: '', nickname: '', avatar: '', lastName: '', firstName: '' },
    coverImage: '',
    createdAt: '',
    deleted: false,
    id: '',
    markdown: false,
    post: {
      author: { id: '', nickname: '', avatar: '', lastName: '', firstName: '' },
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
  [closePrRoutine.SUCCESS]: state => {
    state.postPR.state = PrState.closed;
  },
  [closePrRoutine.FULFILL]: state => {
    state.endSendingData = true;
  },
  [acceptPrRoutine.SUCCESS]: state => {
    state.postPR.state = PrState.closed;
  },
  [acceptPrRoutine.FULFILL]: state => {
    state.endSendingData = true;
  },
  [resetEndSendingDataRoutine.TRIGGER]: state => {
    state.endSendingData = false;
  }
});
