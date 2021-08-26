import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchHighlightsRoutine } from '@screens/HighlightsPage/routines';

export interface IHighlightsReducerState {
  highlights: any;
}

const initialState: IHighlightsReducerState = {
  highlights: []
};

export const highlightsReducer = createReducer(initialState, {
  [fetchHighlightsRoutine.SUCCESS]: (state, { payload }: PayloadAction<any>) => {
    state.highlights = payload;
    console.log(payload);
  }
});
