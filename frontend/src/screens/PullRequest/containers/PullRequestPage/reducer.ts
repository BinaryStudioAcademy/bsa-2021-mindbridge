import {
  acceptPrRoutine,
  closePrRoutine,
  resetEndSendingDataRoutine,
  fetchPrRoutine,
  sendCommentPrRoutine,
  editPrCommentRoutine
} from '../../routines/index';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IPostPR, PrState } from '../../models/IPostPR';
import { ICommentPR } from '@screens/PullRequest/models/ICommentPR';
import { IEditPrComment } from '@screens/PullRequest/models/IEditPrComment';

export interface IPullRequestReducerState {
  postPR: IPostPR;
  endSendingData: boolean;
  commentPr: ICommentPR;
  editPrComment: IEditPrComment;
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
    tags: [],
    comments: []
  },
  commentPr: {
    text: '',
    prId: '',
    author: '',
    avatar: null,
    nickname: ''
  },
  endSendingData: false,
  editPrComment: {
    prCommentId: '',
    text: ''
  }
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
  },
  [sendCommentPrRoutine.SUCCESS]: (state, action) => {
    state.commentPr = initialState.commentPr;
    state.postPR.comments.push(action.payload);
  },
  [editPrCommentRoutine.SUCCESS]: (state, action) => {
    const message = state.postPR.comments.find(comment => comment.id === action.payload.id);
    message.text = action.payload.editText;
  }
});
