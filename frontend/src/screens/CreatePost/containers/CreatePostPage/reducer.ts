import { changeEditViewModeRoutine, changeHtmlMarkdownModeRoutine } from '../../routines/index';
import { createReducer } from '@reduxjs/toolkit';

export interface ICreatePostReducerState {
  modes: {
    htmlMode: boolean;
    markdownMode: boolean;
    editMode: boolean;
    viewMode: boolean;
  };
}

const initialState: ICreatePostReducerState = {
  modes: {
    htmlMode: true,
    markdownMode: false,
    editMode: true,
    viewMode: false
  }
};

export const createPostReducer = createReducer(initialState, {
  [changeHtmlMarkdownModeRoutine.TRIGGER]: state => {
    state.modes.markdownMode = !state.modes.markdownMode;
    state.modes.htmlMode = !state.modes.htmlMode;
  },
  [changeEditViewModeRoutine.TRIGGER]: state => {
    state.modes.editMode = !state.modes.editMode;
    state.modes.viewMode = !state.modes.viewMode;
  }
});
