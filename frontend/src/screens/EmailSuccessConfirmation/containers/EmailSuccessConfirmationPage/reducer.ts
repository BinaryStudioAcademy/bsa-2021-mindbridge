import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import {fetchDataRoutine} from "@screens/EmailSuccessConfirmation/routines";

export interface IEmailSuccessConfirmationReducerState {
  user: IUserProfile;
}

const initialState: IEmailSuccessConfirmationReducerState = {
  user: {
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
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IUserProfile>) => {
    state.user = payload;
  }
});
