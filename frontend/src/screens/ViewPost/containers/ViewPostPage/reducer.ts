import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchHighlightsRoutine,
  fetchDataRoutine, leaveReactionOnCommentRoutine,
  leaveReactionOnPostViewPageRoutine, searchUserByNicknameRoutine,
  sendCommentRoutine,
  sendReplyRoutine, editCommentRoutine, resetSendingEditCommentStatusRoutine
} from '@screens/ViewPost/routines';
import { IPost } from '../../models/IPost';
import { IHighlight } from '@screens/HighlightsPage/models/IHighlight';
import { IComment } from '@screens/ViewPost/models/IComment';
import { ICommentReply } from '@screens/ViewPost/models/ICommentReply';
import { IUsers } from '@screens/ViewPost/models/IUsers';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';
import { deleteFavouritePostRoutine, saveFavouritePostRoutine } from '@screens/FavouritesPage/routines';
import { IEditComment } from '@screens/ViewPost/models/IEditComment';

export interface IViewPostReducerState {
  post: IPost;
  comment: IComment;
  editComment: IEditComment;
  reply: ICommentReply;
  highlights: IHighlight[];
  users: IMentionsUser[];
  endSendingData: boolean;
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
    author: { id: '',
      firstName: '',
      lastName: '',
      avatar: null,
      nickname: '',
      rating: 0,
      commentsQuantity: 0,
      postsQuantity: 0,
      followersQuantity: 0 },
    isLiked: false,
    reacted: false,
    relatedPosts: [],
    comments: [],
    isFavourite: false,
    postViewsNumber: 0
  },
  highlights: undefined,
  comment: {
    text: '',
    author: '',
    postId: '',
    avatar: null,
    nickname: '',
    rating: 0
  },
  reply: {
    text: '',
    author: '',
    postId: '',
    replyCommentId: '',
    avatar: null,
    nickname: '',
    rating: 0
  },
  users: [],
  endSendingData: false,
  editComment: {
    commentId: '',
    text: '',
    sendingEditCommentStatus: false
  }
};

const findById = (id, comments, idx = 0) => {
  const item = comments[idx];

  if (!item) return null;
  if (item.id === id) return item;

  const newComments = item.comments.length ? [...comments, ...item.comments] : comments;

  return findById(id, newComments, idx + 1);
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
        state.post.reacted = action.payload.difference === 1;
        state.post.isLiked = action.payload.difference === 1;
      } else {
        state.post.rating += action.payload.difference;
        state.post.rating += action.payload.difference;
        state.post.isLiked = true;
      }
    } else if (response === null || response.isFirstReaction === true) {
      state.post.rating -= action.payload.difference;
      state.post.reacted = action.payload.difference === 1;
      state.post.isLiked = action.payload.difference !== 1;
    } else {
      state.post.rating -= action.payload.difference;
      state.post.rating -= action.payload.difference;
      state.post.isLiked = false;
    }
  },
  [fetchHighlightsRoutine.SUCCESS]: (state, action) => {
    state.highlights = action.payload;
  },
  [sendCommentRoutine.SUCCESS]: (state, action) => {
    state.comment = initialState.comment;
    state.post.comments.unshift(action.payload);
  },
  [sendReplyRoutine.SUCCESS]: (state, action) => {
    state.reply = initialState.reply;
    const message = findById(action.payload.comment.id, state.post.comments);
    message.comments.unshift(action.payload);
  },
  [editCommentRoutine.SUCCESS]: (state, action) => {
    const message = findById(action.payload.id, state.post.comments);
    message.text = action.payload.text;
  },
  [leaveReactionOnCommentRoutine.SUCCESS]: (state, action) => {
    const { response, reactionStatus } = action.payload;
    const message = findById(action.payload.commentId, state.post.comments);
    if (reactionStatus === true) {
      if (response === null || response.isFirstReaction === true) {
        message.rating += action.payload.difference;
      } else {
        message.rating += action.payload.difference;
        message.rating += action.payload.difference;
      }
    } else if (response === null || response.isFirstReaction === true) {
      message.rating -= action.payload.difference;
    } else {
      message.rating -= action.payload.difference;
      message.rating -= action.payload.difference;
    }
  },
  [searchUserByNicknameRoutine.SUCCESS]: (state, { payload }: PayloadAction<IUsers>) => {
    state.users = payload.users;
  },
  [saveFavouritePostRoutine.SUCCESS]: state => {
    state.post.isFavourite = true;
  },
  [deleteFavouritePostRoutine.TRIGGER]: state => {
    state.post.isFavourite = false;
  },
  [editCommentRoutine.FULFILL]: state => {
    state.endSendingData = true;
  },
  [resetSendingEditCommentStatusRoutine.TRIGGER]: state => {
    state.endSendingData = false;
  }
});
