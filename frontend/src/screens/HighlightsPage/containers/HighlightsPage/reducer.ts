import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  addMoreHighlightsRoutine,
  deleteHighlightRoutine,
  fetchHighlightsRoutine
} from '@screens/HighlightsPage/routines';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';
import { isEmptyArray } from 'formik';
import { saveHighlightRoutine } from '@screens/ViewPost/routines';

export interface IHighlightsReducerState {
  highlights: IHighlight[];
  hasMore: boolean;
  loadMore: boolean;
}

const initialState: IHighlightsReducerState = {
  highlights: undefined,
  hasMore: false,
  loadMore: false
};

export const highlightsReducer = createReducer(initialState, {
  [fetchHighlightsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IHighlight[]>) => {
    if (!state.loadMore) {
      state.highlights = payload;
    } else {
      state.highlights = state.highlights.concat(payload);
    }
    state.hasMore = !isEmptyArray(payload);
  },
  [addMoreHighlightsRoutine.TRIGGER]: state => {
    state.loadMore = true;
  },
  [deleteHighlightRoutine.SUCCESS]: (state, action) => {
    state.highlights = state.highlights.filter(hs => hs.id !== action.payload);
  },
  [saveHighlightRoutine.SUCCESS]: (state, action) => {
    state.highlights.push(action.payload);
  }
});
