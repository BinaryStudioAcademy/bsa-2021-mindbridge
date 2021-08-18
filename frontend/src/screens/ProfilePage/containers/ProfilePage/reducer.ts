import { createReducer } from '@reduxjs/toolkit';
import {
  sendNicknameRoutine,
  sendFormRoutine,
  sendAvatarRoutine,
  openPasswordChangeModalRoutine, sendChangePasswordFormRoutine
} from '@screens/ProfilePage/routines';
import { IDataProfile } from '@screens/ProfilePage/models/IDataProfile';

const initialState: IDataProfile = {
  isNicknameEngaged: false,
  isPasswordRight: false,
  isFormLoaded: true,
  isChangePasswordFormLoaded: true,
  isNicknameLoaded: true,
  isPasswordChangeModalOpen: false,
  savingAvatar: {
    url: '',
    isLoaded: true
  }
};

export const profilePageReducer = createReducer(initialState, {
  [sendNicknameRoutine.TRIGGER]: state => {
    state.isNicknameLoaded = false;
  },
  [sendNicknameRoutine.SUCCESS]: (state, action) => {
    state.isNicknameEngaged = action.payload;
    state.isNicknameLoaded = true;
  },
  [sendNicknameRoutine.FAILURE]: state => {
    state.isNicknameLoaded = true;
  },
  [sendFormRoutine.TRIGGER]: state => {
    state.isFormLoaded = false;
  },
  [sendFormRoutine.SUCCESS]: (state, action) => {
    state.isNicknameEngaged = action.payload;
    state.isFormLoaded = true;
  },
  [sendFormRoutine.FAILURE]: state => {
    state.isFormLoaded = true;
  },
  [sendChangePasswordFormRoutine.TRIGGER]: state => {
    state.isChangePasswordFormLoaded = false;
  },
  [sendChangePasswordFormRoutine.SUCCESS]: (state, action) => {
    state.isPasswordRight = action.payload;
    state.isChangePasswordFormLoaded = true;
  },
  [sendChangePasswordFormRoutine.FAILURE]: state => {
    state.isChangePasswordFormLoaded = true;
  },
  [sendAvatarRoutine.TRIGGER]: state => {
    state.savingAvatar.isLoaded = false;
  },
  [sendAvatarRoutine.SUCCESS]: (state, action) => {
    state.savingAvatar.url = action.payload;
    state.savingAvatar.isLoaded = true;
  },
  [sendAvatarRoutine.FAILURE]: state => {
    state.savingAvatar.url = '';
    state.savingAvatar.isLoaded = true;
  },
  [openPasswordChangeModalRoutine.TRIGGER]: (state, action) => {
    state.isPasswordChangeModalOpen = action.payload;
  },
  [openPasswordChangeModalRoutine.SUCCESS]: state => {
    state.isPasswordChangeModalOpen = false;
  }
});
