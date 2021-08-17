import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { pullRequestReducer } from '@screens/PullRequest/containers/PullRequestPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { fetchPrRoutine } from '@screens/PullRequest/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchPrRequest: reducerCreator([fetchPrRoutine.TRIGGER]),
});

export default combineReducers({
  requests,
  data: pullRequestReducer
});

const reqs = (state: RootState) => state.pullRequestReducer.requests;
const data = (state: RootState) => state.pullRequestReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchPrLoading = state => reqs(state).fetchPrRequest.loading;
export const extractFetchPrError = state => reqs(state).fetchPrRequest.error;
