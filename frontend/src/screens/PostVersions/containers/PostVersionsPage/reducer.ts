import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { getPostVersionsRoutine } from '@screens/PostVersions/routines';
import { IPostVersions } from '@screens/PostVersions/models/IPostVersions';
import { isEmptyArray } from 'formik';

export interface IPostVersionsReducerState {
  versionsOfPost: IPostVersions[];
  hasMore: boolean;
}

const initialState: IPostVersionsReducerState = {
  versionsOfPost: [],
  hasMore: true
};

export const postVersionsReducer = createReducer(initialState, {
  [getPostVersionsRoutine.SUCCESS]: (state, { payload }: PayloadAction<[IPostVersions]>) => {
    payload.map(version => state.versionsOfPost.push(version));
    state.hasMore = !isEmptyArray(payload);
  }
});
