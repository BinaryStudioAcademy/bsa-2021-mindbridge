import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataRoutine } from '@screens/FeedPage/routines';
import { IData, IDataArr } from '@screens/FeedPage/models/IData';

export interface IFeedPageReducerState {
  posts: [IData];
}

const initialState: IFeedPageReducerState = {
  posts: [{
    id: 'John',
    title: 'Hello',
    text: 'Hello',
    authorName: 'Hello',
    commentsCount: 0,
    likesCount: 0,
    disLikesCount: 0,
    tags: [{ id: '1', name: 'Java' }],
    createdAt: '28 may',
    postRating: 0
  }]
};

export const feedPageReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IDataArr>) => {
    console.log(payload);
    state.posts = payload.posts;
  }
});
