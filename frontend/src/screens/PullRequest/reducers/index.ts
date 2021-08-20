import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { pullRequestReducer } from '@screens/PullRequest/containers/PullRequestPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { acceptPrRoutine } from '@screens/PullRequest/routines';
import { resetEndSendingDataRoutine } from '@screens/PullRequest/routines';
import { closePrRoutine } from '@screens/PullRequest/routines';
import { fetchPrRoutine } from '@screens/PullRequest/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  acceptPrRequest: reducerCreator([acceptPrRoutine.TRIGGER]),
  resetEndSendingDataRequest: reducerCreator([resetEndSendingDataRoutine.TRIGGER]),
  closePrRequest: reducerCreator([closePrRoutine.TRIGGER]),
  fetchPrRequest: reducerCreator([fetchPrRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: pullRequestReducer
});

const reqs = (state: RootState) => state.pullRequestReducer.requests;
const data = (state: RootState) => state.pullRequestReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractAcceptPrLoading = state => reqs(state).acceptPrRequest.loading;
export const extractAcceptPrError = state => reqs(state).acceptPrRequest.error;
export const extractResetEndSendingDataLoading = state => reqs(state).resetEndSendingDataRequest.loading;
export const extractResetEndSendingDataError = state => reqs(state).resetEndSendingDataRequest.error;
export const extractClosePrLoading = state => reqs(state).closePrRequest.loading;
export const extractClosePrError = state => reqs(state).closePrRequest.error;
export const extractFetchPrLoading = state => reqs(state).fetchPrRequest.loading;
export const extractFetchPrError = state => reqs(state).fetchPrRequest.error;
