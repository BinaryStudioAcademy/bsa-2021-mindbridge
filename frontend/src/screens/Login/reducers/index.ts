import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { loadCurrentUserRoutine,
  loginRoutine,
  registerRoutine,
  getUserIpRoutine,
  savePostViewRoutine
} from '../routines/index';
import { authReducer } from '@screens/Login/containers/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  savePostViewRequest: reducerCreator([savePostViewRoutine.TRIGGER]),
  getUserIpRequest: reducerCreator([getUserIpRoutine.TRIGGER]),
  loginRequest: reducerCreator([loginRoutine.TRIGGER, loginRoutine.SUCCESS]),
  registerRequest: reducerCreator([registerRoutine.TRIGGER]),
  loadCurrentUserRequest: reducerCreator([loadCurrentUserRoutine.TRIGGER])
});

export default combineReducers({
  auth: authReducer,
  requests
});

/* PlopJS request_extractor placeholder. Do not remove */
