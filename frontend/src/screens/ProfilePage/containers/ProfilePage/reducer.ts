import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { sendNicknameRoutine, sendFormRoutine } from '@screens/ProfilePage/routines';
import { IDataProfile } from '@screens/ProfilePage/models/IDataProfile';

const initialState: IDataProfile = {
  isNicknameEngaged: false,
  isFormLoaded: true,
  isNicknameLoaded: true
};

export const profilePageReducer = createReducer(initialState, {
  [sendNicknameRoutine.TRIGGER]: (state, { payload }: PayloadAction<boolean>) => {
    state.isNicknameLoaded = false;
  },
  [sendNicknameRoutine.SUCCESS]: (state, { payload }: PayloadAction<boolean>) => {
    state.isNicknameEngaged = payload;
    state.isNicknameLoaded = true;
  },
  [sendNicknameRoutine.FAILURE]: (state, { payload }: PayloadAction<boolean>) => {
    state.isNicknameLoaded = true;
  },
  [sendFormRoutine.TRIGGER]: (state, { payload }: PayloadAction<boolean>) => {
    state.isFormLoaded = false;
  },
  [sendFormRoutine.SUCCESS]: (state, { payload }: PayloadAction<boolean>) => {
    state.isNicknameEngaged = payload;
    state.isFormLoaded = true;
  },
  [sendFormRoutine.FAILURE]: (state, { payload }: PayloadAction<boolean>) => {
    state.isFormLoaded = true;
  }
});
