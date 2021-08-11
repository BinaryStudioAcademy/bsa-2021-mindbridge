import { all } from 'redux-saga/effects';
/* PlopJS import placeholder. Do not remove */
import headerSagas from '@screens/Header/sagas';
import feedPageSagas from '@screens/FeedPage/sagas';
import createPostSagas from '@screens/CreatePost/sagas';
import loginSagas from '@screens/Login/sagas';
import defaultSagas from '@screens/Default/sagas';
import pageNotFoundSagas from '@screens/NotFound/sagas';
import viewPostSagas from '@screens/ViewPost/sagas';

export default function* rootSaga() {
  yield all([
    /* PlopJS sagas placeholder. Do not remove */
    headerSagas(),
    pageNotFoundSagas(),
    createPostSagas(),
    feedPageSagas(),
    viewPostSagas(),
    loginSagas(),
    defaultSagas()
  ]);
}
