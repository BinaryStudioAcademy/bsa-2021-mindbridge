import { sendImageRoutine } from '../../routines/index';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

export interface ICreatePostReducerState {
  savingImage: {
    title: string;
    url: string;
  };
}

const initialState: ICreatePostReducerState = {
  savingImage: {
    title: '',
    url: ''
  }
};

export const createPostReducer = createReducer(initialState, {
  [sendImageRoutine.SUCCESS]: (state, action) => {
    state.savingImage = {
      title: state.savingImage.title,
      url: ''
    };
  },
  [sendImageRoutine.TRIGGER]: (state, action) => {
    console.log(action.payload);
    state.savingImage = {
      title: action.payload.name,
      url: 'loading'
    };
  }
});
