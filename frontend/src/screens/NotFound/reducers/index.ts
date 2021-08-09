import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { pageNotFoundReducer } from '@screens/NotFound/containers/NotFoundPage/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: pageNotFoundReducer
});

const reqs = (state: RootState) => state.pageNotFoundReducer.requests;
const data = (state: RootState) => state.pageNotFoundReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
