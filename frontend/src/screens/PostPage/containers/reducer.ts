import {
  resetImageTagRoutine,
  editPostRoutine, sendPostRoutine, sendPRRoutine,
  fetchTagsRoutine,
  resetLoadingImageRoutine,
  sendImageRoutine,
  fetchUserProfileRoutine,
  fetchPostRoutine,
  getPostVersionsRoutine,
  setLoaderRoutine,
  likePostViewRoutine,
  disLikePostViewRoutine
} from '../../routines/index';

import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '@screens/CreatePost/models/IUserProfile';
import { IPost } from '@screens/CreatePost/models/IPost';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { IPostVersions } from '@screens/CreatePost/models/IPostVersions';
import { isEmptyArray } from 'formik';

export interface IPostPageReducerState {
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
  versionsOfPost: IPostVersion[];
  allTags: [];
  post: IPost;
  postLoading: boolean;
  preloader: {
    publishButton: boolean;
    draftButton: boolean;
  };
}

const initialState: IPostPageReducerState = {
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
  postLoading: false,
  post: null,
  preloader: {
    publishButton: false,
    draftButton: false
  }
};

export const postPageReducer = createReducer(initialState, {
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
  [getPostVersionsRoutine.SUCCESS]: (state, { payload }: PayloadAction<[IPostVersion]>) => {
    state.versionsOfPost = [];
    payload.map(version => state.versionsOfPost.push(version));
  },
  [setLoaderRoutine.SUCCESS]: (state, { payload }) => {
    state.postLoading = payload.isLoading;
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
  [editPostRoutine.SUCCESS]: state => {
    state.post = initialState.post;
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
  [sendPRRoutine.SUCCESS]: state => {
    state.post = initialState.post;
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
  [likePostViewRoutine.TRIGGER]: (state, action) => {
    if (state.profile.id) {
      const postReaction = state.profile.userReactions.find(post => post.postId === action.payload);
      if (postReaction && postReaction.liked === false) {
        postReaction.liked = true;
      } else if (postReaction) {
        postReaction.postId = undefined;
      } else {
        state.profile.userReactions.push({ postId: action.payload, liked: true });
      }
    }
  },
  [disLikePostViewRoutine.TRIGGER]: (state, action) => {
    if (state.profile.id) {
      const postReaction = state.profile.userReactions.find(post => post.postId === action.payload);
      if (postReaction && postReaction.liked === true) {
        postReaction.liked = false;
      } else if (postReaction) {
        postReaction.postId = undefined;
      } else {
        state.profile.userReactions.push({ postId: action.payload, liked: false });
      }
    }
  }
});
