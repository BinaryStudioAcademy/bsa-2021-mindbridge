import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IDraft } from '@screens/Drafts/models/IDraft';
import { fetchDraftsRoutine } from '@screens/Drafts/routines';

export interface IDraftsReducerState {
  drafts: IDraft[];
}

const initialState: IDraftsReducerState = {
  drafts: []
};

export const draftsReducer = createReducer(initialState, {
  [fetchDraftsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IDraft[]>) => {
    state.drafts = payload;
  }
});
