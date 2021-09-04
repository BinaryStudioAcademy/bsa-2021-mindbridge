import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserRoutine } from '@screens/EmailSuccessConfirmation/routines';
import { IUserConfirmationEmail } from '@screens/EmailSuccessConfirmation/models/IUserConfirmationEmail';

export interface IEmailSuccessConfirmationReducerState {
  user: IUserConfirmationEmail;
}

const initialState: IEmailSuccessConfirmationReducerState = {
  user: {
    viewed: undefined,
    emailVerified: undefined
  }
};

export const emailSuccessConfirmationReducer = createReducer(initialState, {
  [fetchUserRoutine.SUCCESS]: (state, { payload }: PayloadAction<IUserConfirmationEmail>) => {
    state.user = payload;
  }
});
