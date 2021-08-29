import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { postVersionPageReducer } from '@screens/PostVersionPage/containers/PostVersionPage/reducer';
import { fetchPostVersionRoutine } from '@screens/PostVersionPage/routines';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchPostVersionRequest: reducerCreator([fetchPostVersionRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: postVersionPageReducer
});

const reqs = (state: RootState) => state.postVersionPageReducer.requests;
const data = (state: RootState) => state.postVersionPageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchPostVersionLoading = state => reqs(state).fetchPostVersionRequest.loading;
export const extractFetchPostVersionError = state => reqs(state).fetchPostVersionRequest.error;

export const extractData = state => data(state);
