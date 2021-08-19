import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { getPostVersionsRoutine } from '@screens/PostVersions/routines';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { isEmptyArray } from 'formik';

export interface IPostVersionsReducerState {
  versionsOfPost: IPostVersion[];
  hasMore: boolean;
}

const initialState: IPostVersionsReducerState = {
  versionsOfPost: [],
  hasMore: true
};

export const postVersionsReducer = createReducer(initialState, {
  [getPostVersionsRoutine.SUCCESS]: (state, { payload }: PayloadAction<[IPostVersion]>) => {
    payload.map(version => state.versionsOfPost.push(version));
    state.hasMore = !isEmptyArray(payload);
  }
});
