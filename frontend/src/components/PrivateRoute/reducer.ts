import { fetchUserProfileRoutine } from '@screens/PostPage/routines';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

export interface IPrivateRouteReducerState {
  profile: IUserProfile;
}

const initialState: IPrivateRouteReducerState = {
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

export const privateRouteReducer = createReducer(initialState, {
  [fetchUserProfileRoutine.SUCCESS]: (state, { payload }: PayloadAction<IUserProfile>) => {
    state.profile = payload;
  }
});
