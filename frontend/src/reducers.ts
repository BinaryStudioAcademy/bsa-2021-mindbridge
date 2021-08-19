import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import headerReducer from '@screens/Header/reducers';
import postPageReducer from '@screens/PostPage/reducers';
import feedPageReducer from '@screens/FeedPage/reducers';
import defaultReducer from '@screens/Default/reducers';
import auth from '@screens/Login/reducers';
import profilePageReducer from '@screens/ProfilePage/reducers';
import viewPostReducer from '@screens/ViewPost/reducers';

export default combineReducers({
  toastr,
  /* PlopJS reducer placeholder. Do not remove */
  headerReducer,
  postPageReducer,
  feedPageReducer,
  profilePageReducer,
  viewPostReducer,
  auth,
  defaultReducer
});
