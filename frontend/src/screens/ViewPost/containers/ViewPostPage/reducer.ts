import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataRoutine, leaveReactionOnPostViewPageRoutine } from '@screens/ViewPost/routines';
import { IPost } from '../../models/IPost';

export interface IViewPostReducerState {
  post: IPost;
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
    comments: [],
    draft: false,
    author: { id: '', firstName: '', lastName: '', avatar: '', nickname: '' }
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
  }
});
