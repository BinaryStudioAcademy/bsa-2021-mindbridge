import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { loginReducer } from '@screens/Login/containers/LoginPage/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: loginReducer
});

const reqs = (state: RootState) => state.loginReducer.requests;
const data = (state: RootState) => state.loginReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */

