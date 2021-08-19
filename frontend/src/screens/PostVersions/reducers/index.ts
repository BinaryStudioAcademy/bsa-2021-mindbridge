import { combineReducers } from 'redux';
import { postVersionsReducer } from '@screens/PostVersions/containers/PostVersionsPage/reducer';
import { RootState } from '@root/store';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: postVersionsReducer
});

const data = (state: RootState) => state.postVersionsReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractData = state => data(state);
