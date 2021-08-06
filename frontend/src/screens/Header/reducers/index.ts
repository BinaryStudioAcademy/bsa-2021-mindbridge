import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { headerReducer } from '@screens/Header/containers/HeaderPage/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: headerReducer
});

const reqs = (state: RootState) => state.headerReducer.requests;
const data = (state: RootState) => state.headerReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractData = state => data(state);
