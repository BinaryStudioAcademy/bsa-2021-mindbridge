import { createAction, createReducer } from '@reduxjs/toolkit';

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

export const changeHtmlMarkdownMod = createAction('CHANGE_MOD_HTML_MARKDOWN');
export const changeEditViewMod = createAction('CHANGE_MOD_EDIT_VIEW');

export const createPostReducer = createReducer(initialState, {
  [changeHtmlMarkdownMod.type]: state => {
    state.modes.markdownMode = !state.modes.markdownMode;
    state.modes.htmlMode = !state.modes.htmlMode;
  },
  [changeEditViewMod.type]: state => {
    state.modes.editMode = !state.modes.editMode;
    state.modes.viewMode = !state.modes.viewMode;
  }
});
