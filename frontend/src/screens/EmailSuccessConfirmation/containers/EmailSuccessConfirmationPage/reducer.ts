import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { verifiedKeyRoutine } from '@screens/EmailSuccessConfirmation/routines';

export interface IEmailSuccessConfirmationReducerState {
  profile: IUserProfile;
}

const initialState: IEmailSuccessConfirmationReducerState = {
  profile: {
    id: '',
    fullName: undefined,
    nickname: undefined,
    avatar: '',
    postsQuantity: 0,
    followersQuantity: 0,
    rating: 0,
    userReactions: [],
    emailVerified: undefined,
    userReactionsComments: []
  }
};

export const emailSuccessConfirmationReducer = createReducer(initialState, {
  [verifiedKeyRoutine.SUCCESS]: (state, { payload }: PayloadAction<IUserProfile>) => {
    state.profile = payload;
  }
});
