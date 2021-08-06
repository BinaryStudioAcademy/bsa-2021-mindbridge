import { all } from 'redux-saga/effects';
/* PlopJS import placeholder. Do not remove */
import headerSagas from '@screens/Header/sagas';
import createPostSagas from '@screens/CreatePost/sagas';
import feedPageSagas from '@screens/FeedPage/sagas';
import loginSagas from '@screens/Login/sagas';
import defaultSagas from '@screens/Default/sagas';

export default function* rootSaga() {
  yield all([
    /* PlopJS sagas placeholder. Do not remove */
    headerSagas(),
    createPostSagas(),
    feedPageSagas(),
    loginSagas(),
    defaultSagas()
  ]);
}
