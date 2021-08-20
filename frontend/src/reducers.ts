import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import postVersionPageReducer from '@screens/PostVersionPage/reducers';
import pullRequestReducer from '@screens/PullRequest/reducers';
import headerReducer from '@screens/Header/reducers';
import createPostReducer from '@screens/CreatePost/reducers';
import feedPageReducer from '@screens/FeedPage/reducers';
import defaultReducer from '@screens/Default/reducers';
import auth from '@screens/Login/reducers';
import profilePageReducer from '@screens/ProfilePage/reducers';
import viewPostReducer from '@screens/ViewPost/reducers';

export default combineReducers({
  toastr,
  /* PlopJS reducer placeholder. Do not remove */
  postVersionPageReducer,
  pullRequestReducer,
  headerReducer,
  createPostReducer,
  feedPageReducer,
  profilePageReducer,
  viewPostReducer,
  auth,
  defaultReducer
});
