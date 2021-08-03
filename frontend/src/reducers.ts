import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import createPostReducer from '@screens/CreatePost/reducers';
import loginReducer from '@screens/Login/reducers';
import defaultReducer from '@screens/Default/reducers';

export default combineReducers({
  toastr,
  /* PlopJS reducer placeholder. Do not remove */
  createPostReducer,
  loginReducer,
  defaultReducer
});
