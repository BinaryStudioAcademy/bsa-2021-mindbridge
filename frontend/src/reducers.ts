import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import headerReducer from '@screens/Header/reducers';
import createPostReducer from '@screens/CreatePost/reducers';
import feedPageReducer from '@screens/FeedPage/reducers';
import loginReducer from '@screens/Login/reducers';
import defaultReducer from '@screens/Default/reducers';

export default combineReducers({
  toastr,
  /* PlopJS reducer placeholder. Do not remove */
  headerReducer,
  createPostReducer,
  feedPageReducer,
  loginReducer,
  defaultReducer
});
