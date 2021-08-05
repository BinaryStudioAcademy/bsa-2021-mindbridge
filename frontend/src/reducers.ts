import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import feedPageReducer from '@screens/FeedPage/reducers';
import loginReducer from '@screens/Login/reducers';
import createPostReducer from '@screens/CreatePost/reducers';
import defaultReducer from '@screens/Default/reducers';
import viewPostReducer from '@screens/ViewPost/reducers';

export default combineReducers({
  toastr,
  /* PlopJS reducer placeholder. Do not remove */
  createPostReducer,
  feedPageReducer,
  loginReducer,
  viewPostReducer,
  defaultReducer
});
