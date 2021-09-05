import { fetchPrRoutine, editPrRoutine } from '../../PullRequest/routines/index';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { IPost } from '@screens/PostPage/models/IPost';
import {
  editPostRoutine,
  fetchPostRoutine,
  fetchTagsRoutine,
  fetchUserProfileRoutine,
  getPostVersionsRoutine, resetImageTagRoutine,
  resetLoadingImageRoutine,
  sendImageRoutine, sendPostRoutine, sendPRRoutine, setLoaderRoutine
} from '@screens/PostPage/routines';
import { IPostPR, PrState } from '@root/screens/PullRequest/models/IPostPR';

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
  postPR: IPostPR;
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
    fullName: undefined,
    nickname: undefined,
    avatar: '',
    postsQuantity: 0,
    followersQuantity: 0,
    rating: 0,
    userReactions: [],
    emailVerified: undefined,
    userReactionsComments: []
  },
  versionsOfPost: [],
  allTags: [],
  postLoading: false,
  post: null,
  preloader: {
    publishButton: false,
    draftButton: false
  },
  postPR: {
    state: PrState.closed,
    contributor: { id: '', nickname: '', avatar: '', lastName: '', firstName: '' },
    coverImage: '',
    createdAt: '',
    deleted: false,
    id: '',
    markdown: false,
    post: {
      author: { id: '', nickname: '', avatar: '', lastName: '', firstName: '' },
      coverImage: '',
      id: '',
      markdown: false,
      text: '',
      title: '',
      tags: []
    },
    text: '',
    title: '',
    updatedAt: '',
    tags: []
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
  [editPrRoutine.TRIGGER]: state => {
    state.preloader = {
      publishButton: true,
      draftButton: false
    };
  },
  [editPrRoutine.FULFILL]: state => {
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
  [fetchPrRoutine.SUCCESS]: (state, action) => {
    state.postPR = action.payload;
  }
});
