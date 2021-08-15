import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { sendNicknameRoutine, sendFormRoutine } from '@screens/ProfilePage/routines';
import { IDataProfile } from '@screens/ProfilePage/models/IDataProfile';

const initialState: IDataProfile = {
  isNicknameEngaged: false,
  isLoaded: true
};

export const profilePageReducer = createReducer(initialState, {
  [sendFormRoutine.TRIGGER]: (state, { payload }: PayloadAction<boolean>) => {
    state.isLoaded = false;
  },
  [sendFormRoutine.SUCCESS]: (state, { payload }: PayloadAction<boolean>) => {
    state.isNicknameEngaged = payload;
    state.isLoaded = true;
  },
  [sendFormRoutine.FAILURE]: (state, { payload }: PayloadAction<boolean>) => {
    state.isLoaded = true;
  }
});
