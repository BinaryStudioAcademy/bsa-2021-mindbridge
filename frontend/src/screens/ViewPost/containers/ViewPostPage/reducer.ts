import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  dislikeCommentRoutine,
  fetchDataRoutine,
  leaveReactionOnPostViewPageRoutine, likeCommentRoutine,
  sendCommentRoutine,
  sendReplyRoutine
} from '@screens/ViewPost/routines';
import { IPost } from '../../models/IPost';
import { IComment } from '@screens/ViewPost/models/IComment';
import { ICommentReply } from '@screens/ViewPost/models/ICommentReply';
import { disLikePostViewRoutine, likePostViewRoutine } from '@screens/PostPage/routines';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';

export interface IViewPostReducerState {
  post: IPost;
  comment: IComment;
  reply: ICommentReply;
  profile: IUserProfile;
}

const initialState: IViewPostReducerState = {
  post: {
    id: '',
    title: '',
    coverImage: null,
    text: '',
    commentsCount: 0,
    rating: 0,
    tags: [],
    createdAt: '',
    postRating: 0,
    avatar: null,
    markdown: false,
    draft: false,
    author: { id: '', firstName: '', lastName: '', avatar: null, nickname: '' },
    comments: []
  },
  comment: {
    text: '',
    author: '',
    postId: '',
    avatar: null,
    nickname: ''
  },
  reply: {
    text: '',
    author: '',
    postId: '',
    replyCommentId: '',
    avatar: null,
    nickname: ''
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
    userReactionsComments: []
  }
};

export const viewPostReducer = createReducer(initialState, {
  [fetchDataRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPost>) => {
    state.post = payload;
  },
  [leaveReactionOnPostViewPageRoutine.SUCCESS]: (state, action) => {
    const { response, reactionStatus } = action.payload;
    if (reactionStatus === true) {
      if (response === null || response.isFirstReaction === true) {
        state.post.rating += action.payload.difference;
      } else {
        state.post.rating += action.payload.difference;
        state.post.rating += action.payload.difference;
      }
    } else if (response === null || response.isFirstReaction === true) {
      state.post.rating -= action.payload.difference;
    } else {
      state.post.rating -= action.payload.difference;
      state.post.rating -= action.payload.difference;
    }
  },
  [sendCommentRoutine.SUCCESS]: (state, action) => {
    state.comment = initialState.comment;
    state.post.comments.unshift(action.payload);
  },
  [sendReplyRoutine.SUCCESS]: (state, action) => {
    state.reply = initialState.reply;

    const findById = (id, comments, idx = 0) => {
      const item = comments[idx];

      if (!item) return null;
      if (item.id === id) return item;

      const newComments = item.comments.length ? [...comments, ...item.comments] : comments;

      return findById(id, newComments, idx + 1);
    };
    const message = findById(action.payload.comment.id, state.post.comments);
    message.comments.unshift(action.payload);
  },
  [likeCommentRoutine.TRIGGER]: (state, action) => {
    if (state.profile.id) {
      const commentReaction = state.profile.userReactionsComments.find(comment => comment.commentId === action.payload);
      if (commentReaction && commentReaction.liked === false) {
        commentReaction.liked = true;
      } else if (commentReaction) {
        commentReaction.commentId = undefined;
      } else {
        state.profile.userReactionsComments.push({ commentId: action.payload, liked: true });
      }
    }
  },
  [dislikeCommentRoutine.TRIGGER]: (state, action) => {
    if (state.profile.id) {
      const commentReaction = state.profile.userReactionsComments.find(comment => comment.commentId === action.payload);
      if (commentReaction && commentReaction.liked === true) {
        commentReaction.liked = false;
      } else if (commentReaction) {
        commentReaction.commentId = undefined;
      } else {
        state.profile.userReactionsComments.push({ commentId: action.payload, liked: false });
      }
    }
  }
});
