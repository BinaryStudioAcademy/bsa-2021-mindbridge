import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { viewPostReducer } from '@screens/ViewPost/containers/ViewPostPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  fetchHighlightsRoutine,
  saveHighlightRoutine,
  fetchDataRoutine, leaveReactionOnCommentRoutine,
  leaveReactionOnPostViewPageRoutine,
  sendCommentRoutine,
  sendReplyRoutine
} from '@screens/ViewPost/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchDataRequest: reducerCreator([fetchDataRoutine.TRIGGER]),
  leaveReactionOnPostViewPageRequest: reducerCreator([leaveReactionOnPostViewPageRoutine.TRIGGER]),
  saveHighlightRequest: reducerCreator([saveHighlightRoutine.TRIGGER]),
  fetchHighlightsRequest: reducerCreator([fetchHighlightsRoutine.TRIGGER]),
  sendCommentRequest: reducerCreator([sendCommentRoutine.TRIGGER]),
  sendReplyRequest: reducerCreator([sendReplyRoutine.TRIGGER]),
  leaveReactionOnCommentRequest: reducerCreator([leaveReactionOnCommentRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: viewPostReducer
});

const reqs = (state: RootState) => state.viewPostReducer.requests;
const data = (state: RootState) => state.viewPostReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchDataLoading = state => reqs(state).fetchDataRequest.loading;
export const extractFetchDataError = state => reqs(state).fetchDataRequest.error;

export const extractData = state => data(state);
export const sendCommentLoading = state => reqs(state).sendCommentRequest.loading;
export const sendCommentError = state => reqs(state).sendCommentRequest.error;
export const sendReplyLoading = state => reqs(state).sendCommentRequest.loading;
export const sendReplyError = state => reqs(state).sendCommentRequest.error;
