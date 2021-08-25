import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchDataRoutine,
  leaveReactionOnPostViewPageRoutine,
  sendCommentRoutine,
  sendReplyRoutine
} from '@screens/ViewPost/routines';
import { IPost } from '../../models/IPost';
import { IComment } from '@screens/ViewPost/models/IComment';
import { ICommentReply } from '@screens/ViewPost/models/ICommentReply';

export interface IViewPostReducerState {
  post: IPost;
  comment: IComment;
  reply: ICommentReply;
}

const initialState: IViewPostReducerState = {
  post: {
    id: '',
    title: '',
    coverImage: null,
    text: '',
    commentsCount: 0,
    rating: 0,
    tags: [],
    createdAt: '',
    postRating: 0,
    avatar: null,
    markdown: false,
    author: { id: '', firstName: '', lastName: '', avatar: null, nickname: '' },
    comments: []
  },
  comment: {
    text: '',
    author: '',
    postId: ''
  },
  reply: {
    text: '',
    author: '',
    postId: '',
    replyCommentId: ''
  }
};

export const viewPostReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPost>) => {
    state.post = payload;
  },
  [leaveReactionOnPostViewPageRoutine.SUCCESS]: (state, action) => {
    const { response, reactionStatus } = action.payload;
    if (reactionStatus === true) {
      if (response === null || response.isFirstReaction === true) {
        state.post.rating += action.payload.difference;
      } else {
        state.post.rating += action.payload.difference;
        state.post.rating += action.payload.difference;
      }
    } else if (response === null || response.isFirstReaction === true) {
      state.post.rating -= action.payload.difference;
    } else {
      state.post.rating -= action.payload.difference;
      state.post.rating -= action.payload.difference;
    }
  },
  [sendCommentRoutine.SUCCESS]: (state, action) => {
    state.comment = initialState.comment;
  },
  [sendReplyRoutine.SUCCESS]: state => {
    state.reply = initialState.reply;
  }
});
