import { changeEditViewModeRoutine, changeHtmlMarkdownModeRoutine, fetchDataRoutine } from '../../routines/index';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IData } from '@screens/Default/models/IData';
import { IUserProfile } from '@screens/CreatePost/models/IUserProfile';

export interface ICreatePostReducerState {
  modes: {
    htmlMode: boolean;
    markdownMode: boolean;
    editMode: boolean;
    viewMode: boolean;
  };
  profile: IUserProfile;
}

const initialState: ICreatePostReducerState = {
  modes: {
    htmlMode: true,
    markdownMode: false,
    editMode: true,
    viewMode: false
  },

  profile: {
    id: '',
    fullName: 'string',
    avatar: '',
    postsQuantity: 0,
    followersQuantity: 0,
    rating: 0,
    datesOfPosts: [{ id: '', createdAt: '' }]
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
  },
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IUserProfile>) => {
    state.profile = payload;
  }
});
