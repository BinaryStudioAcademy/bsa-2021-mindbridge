import { loginRoutine, registerRoutine, setNoAuthorizedRoutine } from '@screens/Login/routines';
import { IDataAuth } from '@screens/Login/models/IDataAuth';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';

const initialState: IDataAuth = {
  isAuthorized: false,
  user: {
    id: '',
    nickname: '',
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    postsQuantity: 0,
    followersQuantity: 0,
    rating: 0
  }
};

export const authReducer = createReducer(initialState, {
  [loginRoutine.SUCCESS]: (state, { payload }: PayloadAction<ICurrentUser>) => {
    state.isAuthorized = true;
    state.user = payload;
  },
  [registerRoutine.SUCCESS]: (state, { payload }: PayloadAction<ICurrentUser>) => {
    state.isAuthorized = true;
    state.user = payload;
  },
  [setNoAuthorizedRoutine.TRIGGER]: state => {
    state.isAuthorized = false;
    state.user = initialState.user;
  }
});
