import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import highlightsReducer from '@screens/HighlightsPage/reducers';
import draftsReducer from '@screens/Drafts/reducers';
import postVersionPageReducer from '@screens/PostVersionPage/reducers';
import pullRequestReducer from '@screens/PullRequest/reducers';
import postVersionsReducer from '@screens/PostVersions/reducers';
import headerReducer from '@screens/Header/reducers';
import postPageReducer from '@screens/PostPage/reducers';
import feedPageReducer from '@screens/FeedPage/reducers';
import defaultReducer from '@screens/Default/reducers';
import auth from '@screens/Login/reducers';
import profilePageReducer from '@screens/ProfilePage/reducers';
import viewPostReducer from '@screens/ViewPost/reducers';
import sidebarReducer from '@screens/Sidebar/reducers';

export default combineReducers({
  toastr,
  /* PlopJS reducer placeholder. Do not remove */
  highlightsReducer,
  draftsReducer,
  postVersionPageReducer,
  pullRequestReducer,
  postVersionsReducer,
  sidebarReducer,
  headerReducer,
  postPageReducer,
  feedPageReducer,
  profilePageReducer,
  viewPostReducer,
  auth,
  defaultReducer
});
