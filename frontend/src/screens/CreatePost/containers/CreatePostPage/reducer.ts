import { resetLoadingImageRoutine, sendImageRoutine } from '../../routines/index';

import { createReducer, PayloadAction } from '@reduxjs/toolkit';

export interface ICreatePostReducerState {
  savingImage: {
    title: string;
    url: string;
    isLoaded: boolean;
    isInContent: boolean;
  };
}

const initialState: ICreatePostReducerState = {
  savingImage: {
    title: '',
    url: '',
    isLoaded: false,
    isInContent: false
  }
};

export const createPostReducer = createReducer(initialState, {
  [sendImageRoutine.SUCCESS]: (state, action) => {
    state.savingImage = {
      ...state.savingImage,
      url: action.payload,
      isLoaded: true
    };
  },
  [sendImageRoutine.TRIGGER]: (state, action) => {
    state.savingImage = {
      ...state.savingImage,
      title: action.payload.file.name,
      isInContent: action.payload.inContent
    };
  },
  [resetLoadingImageRoutine.TRIGGER]: state => {
    state.savingImage = {
      title: '',
      url: '',
      isLoaded: false,
      isInContent: false
    };
  }
});
