import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { defaultReducer } from '@screens/Default/containers/DefaultPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { fetchDataRoutine } from '@screens/Default/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchDataRequest: reducerCreator([fetchDataRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: defaultReducer
});

const reqs = (state: RootState) => state.defaultReducer.requests;
const data = (state: RootState) => state.defaultReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchDataLoading = state => reqs(state).fetchDataRequest.loading;
export const extractFetchDataError = state => reqs(state).fetchDataRequest.error;

export const extractData = state => data(state);
