import { createReducer } from '@reduxjs/toolkit';
import {
  sendNicknameRoutine,
  sendFormRoutine,
  sendAvatarRoutine,
  openPasswordChangeModalRoutine,
  sendChangePasswordFormRoutine,
  fetchUserRoutine,
  deleteAvatarRoutine,
  fetchAchievementsByUserRoutine,
  toggleFollowUserRoutine, unfollowUserFromModalRoutine
} from '@screens/ProfilePage/routines';
import { IDataProfile } from '@screens/ProfilePage/models/IDataProfile';

const initialState: IDataProfile = {
  isNicknameEngaged: false,
  isPasswordRight: false,
  isFormLoaded: true,
  isChangePasswordFormLoaded: true,
  isNicknameLoaded: true,
  isUserLoaded: true,
  isUserIdValid: true,
  isPasswordChangeModalOpen: false,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    nickname: '',
    avatar: '',
    rating: 0,
    commentsQuantity: 0,
    postsQuantity: 0,
    contributionsQuantity: 0,
    followers: [],
    following: [],
    followersQuantity: 0,
    followingQuantity: 0,
    lastArticleTitles: [{ id: '', title: '' }],
    createdAt: '',
    followed: false
  },
  savingAvatar: {
    url: '',
    isLoaded: true
  },
  achievements: [],
  onReloadSidebar: true
};

export const profilePageReducer = createReducer(initialState, {
  [fetchUserRoutine.TRIGGER]: state => {
    state.isUserLoaded = false;
  },
  [fetchUserRoutine.SUCCESS]: (state, action) => {
    state.user = action.payload;
    state.isUserIdValid = true;
    state.isUserLoaded = true;
  },
  [fetchUserRoutine.FAILURE]: state => {
    state.isUserLoaded = true;
    state.isUserIdValid = false;
  },
  [toggleFollowUserRoutine.SUCCESS]: state => {
    state.user.followersQuantity += (state.user.followed ? -1 : 1);
    state.user.followed = !state.user.followed;
  },
  [unfollowUserFromModalRoutine.SUCCESS]: (state, action) => {
    state.user.following = state.user.following.filter(user => user.followerId !== action.payload);
    state.user.followingQuantity -= 1;
  },
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
    state.onReloadSidebar = !state.onReloadSidebar;
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
    state.onReloadSidebar = !state.onReloadSidebar;
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
  },
  [deleteAvatarRoutine.TRIGGER]: state => {
    state.savingAvatar.isLoaded = false;
  },
  [deleteAvatarRoutine.SUCCESS]: state => {
    state.savingAvatar.url = '';
    state.savingAvatar.isLoaded = true;
    state.onReloadSidebar = !state.onReloadSidebar;
  },
  [deleteAvatarRoutine.FAILURE]: state => {
    state.savingAvatar.isLoaded = true;
  },
  [fetchAchievementsByUserRoutine.SUCCESS]: (state, action) => {
    state.achievements = action.payload;
  }
});
