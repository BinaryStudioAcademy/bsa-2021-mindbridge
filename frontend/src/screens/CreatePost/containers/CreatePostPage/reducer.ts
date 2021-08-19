import {
  resetImageTagRoutine,
  editPostRoutine, sendPostRoutine, sendPRRoutine,
  fetchTagsRoutine,
  resetLoadingImageRoutine,
  sendImageRoutine,
  fetchUserProfileRoutine,
  fetchPostRoutine,
  getPostVersionsRoutine, likePostFrontRoutine
} from '../../routines/index';

import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '@screens/CreatePost/models/IUserProfile';
import { IPost } from '@screens/CreatePost/models/IPost';
import { IPostVersions } from '@screens/CreatePost/models/IPostVersions';
import {likePostRoutine} from "@screens/FeedPage/routines";

export interface ICreatePostReducerState {
  savingImage: {
    title: string;
    url: string;
    isLoaded: boolean;
    isInContent: boolean;
  };
  imageTag: {
    isPresent: boolean;
    url: string;
    preloader: boolean;
  };
  profile: IUserProfile;
  versionsOfPost: IPostVersions[];
  allTags: [];
  post?: IPost;
  preloader: {
    publishButton: boolean;
    draftButton: boolean;
  };
}

const initialState: ICreatePostReducerState = {
  savingImage: {
    title: '',
    url: '',
    isLoaded: false,
    isInContent: false
  },
  imageTag: {
    isPresent: false,
    url: '',
    preloader: false
  },
  profile: {
    id: '',
    fullName: '',
    avatar: '',
    postsQuantity: 0,
    followersQuantity: 0,
    rating: 0,
    userReactions: []
  },
  versionsOfPost: [],
  allTags: [],
  preloader: {
    publishButton: false,
    draftButton: false
  }
};

export const createPostReducer = createReducer(initialState, {
  [sendImageRoutine.SUCCESS]: (state, action) => {
    if (state.imageTag.isPresent) {
      state.imageTag = {
        isPresent: true,
        url: action.payload,
        preloader: false
      };
    }
    state.savingImage = {
      ...state.savingImage,
      url: action.payload,
      isLoaded: true
    };
  },
  [sendImageRoutine.TRIGGER]: (state, action) => {
    if (action.payload.inContent) {
      state.imageTag = {
        isPresent: true,
        url: '',
        preloader: true
      };
    }
    state.savingImage = {
      ...state.savingImage,
      title: action.payload.file.name,
      isInContent: action.payload.inContent
    };
  },
  [sendImageRoutine.FAILURE]: (state, action) => {
    if (state.imageTag.isPresent) {
      state.imageTag = {
        isPresent: false,
        url: '',
        preloader: false
      };
    } else {
      state.savingImage = {
        ...state.savingImage,
        url: '0',
        isLoaded: true
      };
    }
  },
  [resetLoadingImageRoutine.TRIGGER]: state => {
    state.savingImage = {
      title: '',
      url: '',
      isLoaded: false,
      isInContent: false
    };
  },
  [fetchUserProfileRoutine.SUCCESS]: (state, { payload }: PayloadAction<IUserProfile>) => {
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
  },
  [sendPostRoutine.TRIGGER]: (state, action) => {
    state.preloader = {
      publishButton: !action.payload.draft,
      draftButton: action.payload.draft
    };
  },
  [sendPostRoutine.FULFILL]: state => {
    state.preloader = {
      publishButton: false,
      draftButton: false
    };
  },
  [editPostRoutine.TRIGGER]: (state, action) => {
    state.preloader = {
      publishButton: !action.payload.draft,
      draftButton: action.payload.draft
    };
  },
  [editPostRoutine.FULFILL]: state => {
    state.preloader = {
      publishButton: false,
      draftButton: false
    };
  },
  [sendPRRoutine.TRIGGER]: state => {
    state.preloader = {
      publishButton: true,
      draftButton: false
    };
  },
  [sendPRRoutine.FULFILL]: state => {
    state.preloader = {
      publishButton: false,
      draftButton: false
    };
  },
  [resetImageTagRoutine.TRIGGER]: state => {
    state.imageTag = {
      isPresent: false,
      url: '',
      preloader: false
    };
  },
  [likePostFrontRoutine.TRIGGER]: state => {
    state.profile.userReactions[0].liked = false;
  }
});
