import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import loginReducer from '@screens/Login/reducers';
import defaultReducer from '@screens/Default/reducers';

export default combineReducers({
  toastr,
  /* PlopJS reducer placeholder. Do not remove */
  loginReducer,
  defaultReducer
});
