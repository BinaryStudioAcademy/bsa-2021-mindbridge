import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import viewPostReducer from '@screens/ViewPost/reducers';
import defaultReducer from '@screens/Default/reducers';

export default combineReducers({
  toastr,
  /* PlopJS reducer placeholder. Do not remove */
  viewPostReducer,
  defaultReducer
});
