import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataRoutine } from '@screens/ProfilePage/routines';
import { IUserProfile } from '@screens/CreatePost/models/IUserProfile';
import { IUserForm } from '@screens/ProfilePage/models/IUserForm';

const initialState: IUserForm = {
  nickname: '',
  avatar: '',
  email: '',
  firstName: '',
  lastName: '',
  password: ''
};

export const profilePageReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IUserForm>) => {
    /* state.posts = payload.posts;*/
  }
});
