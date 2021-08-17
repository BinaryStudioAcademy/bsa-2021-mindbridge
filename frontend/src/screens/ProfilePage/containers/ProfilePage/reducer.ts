import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { sendNicknameRoutine, sendFormRoutine, sendAvatarRoutine } from '@screens/ProfilePage/routines';
import { IDataProfile } from '@screens/ProfilePage/models/IDataProfile';

const initialState: IDataProfile = {
  isNicknameEngaged: false,
  isFormLoaded: true,
  isNicknameLoaded: true,
  savingAvatar: {
    url: '',
    isLoaded: true
  }
};

export const profilePageReducer = createReducer(initialState, {
  [sendNicknameRoutine.TRIGGER]: state => {
    state.isNicknameLoaded = false;
  },
  [sendNicknameRoutine.SUCCESS]: (state, { payload }: PayloadAction<boolean>) => {
    state.isNicknameEngaged = payload;
    state.isNicknameLoaded = true;
  },
  [sendNicknameRoutine.FAILURE]: state => {
    state.isNicknameLoaded = true;
  },
  [sendFormRoutine.TRIGGER]: state => {
    state.isFormLoaded = false;
  },
  [sendFormRoutine.SUCCESS]: (state, { payload }: PayloadAction<boolean>) => {
    state.isNicknameEngaged = payload;
    state.isFormLoaded = true;
  },
  [sendFormRoutine.FAILURE]: state => {
    state.isFormLoaded = true;
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
  }
});
