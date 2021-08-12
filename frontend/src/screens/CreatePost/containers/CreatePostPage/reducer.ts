import {
  fetchTagsRoutine,
  resetLoadingImageRoutine,
  sendImageRoutine,
  fetchDataRoutine,
  fetchPostRoutine,
  getPostVersionsRoutine } from '../../routines/index';

import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '@screens/CreatePost/models/IUserProfile';
import { IPost } from '@screens/CreatePost/models/IPost';
import { IPostVersions } from '@screens/CreatePost/models/IPostVersions';

export interface ICreatePostReducerState {
  savingImage: {
    title: string;
    url: string;
    isLoaded: boolean;
    isInContent: boolean;
  };
  profile: IUserProfile;
  versionsOfPost: IPostVersions[];
  allTags: [];
  post?: IPost;
}

const initialState: ICreatePostReducerState = {
  savingImage: {
    title: '',
    url: '',
    isLoaded: false,
    isInContent: false
  },
  profile: {
    id: '',
    fullName: 'string',
    avatar: '',
    postsQuantity: 0,
    followersQuantity: 0,
    rating: 0
  },
  versionsOfPost: [],
  allTags: []
};

export const createPostReducer = createReducer(initialState, {
  [sendImageRoutine.SUCCESS]: (state, action) => {
    state.savingImage = {
      ...state.savingImage,
      url: action.payload,
      isLoaded: true
    };
  },
  [sendImageRoutine.TRIGGER]: (state, action) => {
    state.savingImage = {
      ...state.savingImage,
      title: action.payload.file.name,
      isInContent: action.payload.inContent
    };
  },
  [resetLoadingImageRoutine.TRIGGER]: state => {
    state.savingImage = {
      title: '',
      url: '',
      isLoaded: false,
      isInContent: false
    };
  },
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IUserProfile>) => {
    state.profile = payload;
  },
  [getPostVersionsRoutine.SUCCESS]: (state, { payload }: PayloadAction<[IPostVersions]>) => {
    state.versionsOfPost = payload;
  },
  [fetchTagsRoutine.SUCCESS]: (state, action) => {
    state.allTags = action.payload;
  },
  [fetchPostRoutine.SUCCESS]: (state, action) => {
    state.post = action.payload;
  }
});
