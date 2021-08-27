import { all, call, put, takeEvery } from 'redux-saga/effects';
import viewPageService from '@screens/ViewPost/services/viewPage';
import { toastr } from 'react-redux-toastr';
import {
  dislikeCommentRoutine,
  fetchDataRoutine,
  leaveReactionOnPostViewPageRoutine, likeCommentRoutine,
  sendCommentRoutine,
  sendReplyRoutine
} from '@screens/ViewPost/routines';
import feedPageService from '@screens/FeedPage/services/feedPage';

function* fetchData(action) {
  try {
    const response = yield call(viewPageService.getData, action.payload);
    yield put(fetchDataRoutine.success(response));
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  }
}

function* leaveReaction(action) {
  try {
    const response = yield call(feedPageService.likePost, action.payload);
    const postReaction = {
      response,
      difference: response?.id ? 1 : -1,
      reactionStatus: action.payload.liked
    };
    yield put(leaveReactionOnPostViewPageRoutine.success(postReaction));
  } catch (error) {
    yield put(leaveReactionOnPostViewPageRoutine.failure(error?.message));
    toastr.error('Error', 'Leave reaction on post failed');
  }
}

function* sendComment(action) {
  try {
    const response = yield call(viewPageService.sendComment, action.payload);
    yield put(sendCommentRoutine.success(response));
    toastr.success('Success', 'Comment was sent!');
  } catch (error) {
    yield put(sendCommentRoutine.failure(error?.message));
    toastr.error('Error', 'Comment send failed!');
  } finally {
    yield put(sendCommentRoutine.fulfill());
  }
}

function* sendReply(action) {
  try {
    const response = yield call(viewPageService.sendReply, action.payload);
    yield put(sendReplyRoutine.success(response));
    toastr.success('Success', 'Reply was sent');
  } catch (error) {
    yield put(sendReplyRoutine.failure(error?.message));
    toastr.error('Error', 'Reply send failed');
  } finally {
    yield put(sendReplyRoutine.fulfill());
  }
}

function* likeComment(action) {
  try {
    const response = yield call(viewPageService.leaveReactionOnComment, action.payload);
    const commentReaction = {
      response,
      difference: response?.id ? 1 : -1,
      commentId: action.payload.commentId,
      reactionStatus: action.payload.liked
    };
    yield put(likeCommentRoutine.success(commentReaction));
    toastr.success('Success', 'Like comment success');
  } catch (error) {
    yield put(likeCommentRoutine.failure(error?.message));
    toastr.error('Error', 'Like comment failad');
  }
}

function* dislikeComment(action) {
  try {
    const response = yield call(viewPageService.leaveReactionOnComment, action.payload);
    const commentReaction = {
      response,
      difference: response?.id ? 1 : -1,
      commentId: action.payload.commentId,
      reactionStatus: action.payload.liked
    };
    yield put(dislikeCommentRoutine.success(commentReaction));
    toastr.success('Success', 'Dislike comment success');
  } catch (error) {
    yield put(dislikeCommentRoutine.failure(error?.message));
    toastr.error('Error', 'dislike comment failad');
  }
}

function* watchLikeCommentRequest() {
  yield takeEvery(likeCommentRoutine.TRIGGER, likeComment);
}

function* watchDislikeCommentRequest() {
  yield takeEvery(dislikeCommentRoutine.TRIGGER, dislikeComment);
}

function* watchSendCommentRequest() {
  yield takeEvery(sendCommentRoutine.TRIGGER, sendComment);
}

function* watchSendReplyRequest() {
  yield takeEvery(sendReplyRoutine.TRIGGER, sendReply);
}

function* watchDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

function* watchLeaveReactionOnPost() {
  yield takeEvery(leaveReactionOnPostViewPageRoutine.TRIGGER, leaveReaction);
}
export default function* viewPostPageSagas() {
  yield all([
    watchDataRequest(),
    watchLeaveReactionOnPost(),
    watchSendCommentRequest(),
    watchSendReplyRequest(),
    watchLikeCommentRequest(),
    watchDislikeCommentRequest()
  ]);
}

