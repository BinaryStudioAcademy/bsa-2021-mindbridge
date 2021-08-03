import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import defaultReducer from '@screens/Default/reducers';
import loginReducer from '@screens/Login/reducers';
import viewPostReducer from '@screens/ViewPost/reducers';

export default combineReducers({
  toastr,
  loginReducer,
  viewPostReducer,
  /* PlopJS reducer placeholder. Do not remove */
  defaultReducer
});
