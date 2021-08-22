import { all } from 'redux-saga/effects';
/* PlopJS import placeholder. Do not remove */
import headerSagas from '@screens/Header/sagas';
import feedPageSagas from '@screens/FeedPage/sagas';
import createPostSagas from '@screens/CreatePost/sagas';
import loginSagas from '@screens/Login/sagas';
import defaultSagas from '@screens/Default/sagas';
import viewPostSagas from '@screens/ViewPost/sagas';
import profilePageSagas from '@screens/ProfilePage/sagas';
import pullRequestSagas from './screens/PullRequest/sagas';
import postVersionSagas from '@screens/PostVersionPage/sagas';
import postVersionsPageSagas from '@screens/PostVersions/containers/PostVersionsPage/sagas';

export default function* rootSaga() {
  yield all([
    /* PlopJS sagas placeholder. Do not remove */
    postVersionSagas(),
    pullRequestSagas(),
    headerSagas(),
    createPostSagas(),
    profilePageSagas(),
    feedPageSagas(),
    viewPostSagas(),
    loginSagas(),
    defaultSagas(),
    postVersionsPageSagas()
  ]);
}
