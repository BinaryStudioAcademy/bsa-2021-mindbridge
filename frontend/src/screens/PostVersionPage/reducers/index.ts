import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { postVersionPageReducer } from '@screens/PostVersionPage/containers/PostVersionPagePage/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: postVersionPageReducer
});

const reqs = (state: RootState) => state.postVersionPage.requests;
const data = (state: RootState) => state.postVersionPage.data;

/* PlopJS request_extractor placeholder. Do not remove */
