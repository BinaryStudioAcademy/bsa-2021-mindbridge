import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchDataRoutine,
  fetchHighlightsRoutine,
  leaveReactionOnPostViewPageRoutine,
  saveHighlightRoutine
} from '@screens/ViewPost/routines';
import { IPost } from '../../models/IPost';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';
import { deleteHighlightRoutine } from '@screens/HighlightsPage/routines';

export interface IViewPostReducerState {
  post: IPost;
  highlights: IHighlight[];
}

const initialState: IViewPostReducerState = {
  post: {
    id: '',
    title: '',
    coverImage: '',
    text: '',
    commentsCount: 0,
    rating: 0,
    tags: [],
    createdAt: '',
    postRating: 0,
    avatar: '',
    markdown: false,
    draft: false,
    author: { id: '', firstName: '', lastName: '', avatar: '', nickname: '' }
  },
  highlights: undefined
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
  [fetchHighlightsRoutine.SUCCESS]: (state, action) => {
    state.highlights = action.payload;
  }
});
