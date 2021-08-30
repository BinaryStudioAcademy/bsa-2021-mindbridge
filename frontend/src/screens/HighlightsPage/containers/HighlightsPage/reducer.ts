import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { deleteHighlightRoutine, fetchHighlightsRoutine } from '@screens/HighlightsPage/routines';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';

export interface IHighlightsReducerState {
  highlights: IHighlight[];
}

const initialState: IHighlightsReducerState = {
  highlights: undefined
};

export const highlightsReducer = createReducer(initialState, {
  [fetchHighlightsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IHighlight[]>) => {
    state.highlights = payload;
  },
  [deleteHighlightRoutine.SUCCESS]: (state, action) => {
    state.highlights = state.highlights.filter(hs => hs.id !== action.payload);
  }
});
