import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { profilePageReducer } from '@screens/ProfilePage/containers/ProfilePage/reducer';
/* PlopJS import placeholder. Do not remove */
import { fetchDataRoutine } from '@screens/ProfilePage/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchDataRequest: reducerCreator([fetchDataRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: profilePageReducer
});

const reqs = (state: RootState) => state.profilePageReducer.requests;
const data = (state: RootState) => state.profilePageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchDataLoading = state => reqs(state).fetchDataRequest.loading;
export const extractFetchDataError = state => reqs(state).fetchDataRequest.error;

export const extractData = state => data(state);

