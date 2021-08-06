import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { loginRoutine, registerRoutine } from '../routines/index';
import { authReducer } from '@screens/Login/containers/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  loginRequest: reducerCreator([loginRoutine.TRIGGER, loginRoutine.SUCCESS]),
  registerRequest: reducerCreator([registerRoutine.TRIGGER])
});

export default combineReducers({
  auth: authReducer,
  requests
});

/* PlopJS request_extractor placeholder. Do not remove */

