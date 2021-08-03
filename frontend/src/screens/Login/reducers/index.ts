import { combineReducers } from 'redux';
import { loginReducer } from '@screens/Login/containers/LoginPage/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: loginReducer
});

/* PlopJS request_extractor placeholder. Do not remove */
