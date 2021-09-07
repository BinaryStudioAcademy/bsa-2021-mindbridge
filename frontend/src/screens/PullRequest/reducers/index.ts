import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { pullRequestReducer } from '@screens/PullRequest/containers/PullRequestPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  acceptPrRoutine,
  resetEndSendingDataRoutine,
  closePrRoutine,
  fetchPrRoutine,
  editPrRoutine,
  fetchMyPullRequestsRoutine,
  editPrCommentRoutine, resetSendingEditCommentStatusRoutine
}
  from '@screens/PullRequest/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchMyPullRequestsRequest: reducerCreator([fetchMyPullRequestsRoutine.TRIGGER]),
  editPrRequest: reducerCreator([editPrRoutine.TRIGGER]),
  acceptPrRequest: reducerCreator([acceptPrRoutine.TRIGGER]),
  resetEndSendingDataRequest: reducerCreator([resetEndSendingDataRoutine.TRIGGER]),
  closePrRequest: reducerCreator([closePrRoutine.TRIGGER]),
  fetchPrRequest: reducerCreator([fetchPrRoutine.TRIGGER]),
  editPrCommentRequest: reducerCreator([editPrCommentRoutine.TRIGGER]),
  resetSendingEditCommentStatusRequest: reducerCreator([resetSendingEditCommentStatusRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: pullRequestReducer
});

const reqs = (state: RootState) => state.pullRequestReducer.requests;
const data = (state: RootState) => state.pullRequestReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchMyPullRequestsLoading = state => reqs(state).fetchMyPullRequestsRequest.loading;
export const extractFetchMyPullRequestsError = state => reqs(state).fetchMyPullRequestsRequest.error;
export const extractEditPrLoading = state => reqs(state).editPrRequest.loading;
export const resetSendingEditCommentStatusLoading = state => reqs(state).resetSendingEditCommentStatusRequest.loading;
export const resetSendingEditCommentStatusError = state => reqs(state).resetSendingEditCommentStatusRequest.error;
export const editPrCommentLoading = state => reqs(state).editPrCommentRequest.loading;
export const editPrCommentError = state => reqs(state).editPrCommentRequest.error;
export const extractEditPrError = state => reqs(state).editPrRequest.error;
export const extractAcceptPrLoading = state => reqs(state).acceptPrRequest.loading;
export const extractAcceptPrError = state => reqs(state).acceptPrRequest.error;
export const extractResetEndSendingDataLoading = state => reqs(state).resetEndSendingDataRequest.loading;
export const extractResetEndSendingDataError = state => reqs(state).resetEndSendingDataRequest.error;
export const extractClosePrLoading = state => reqs(state).closePrRequest.loading;
export const extractClosePrError = state => reqs(state).closePrRequest.error;
export const extractFetchPrLoading = state => reqs(state).fetchPrRequest.loading;
export const extractFetchPrError = state => reqs(state).fetchPrRequest.error;
