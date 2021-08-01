import { all } from 'redux-saga/effects';
import feedPagePageSagas from '@screens/FeedPage/containers/FeedPage/sagas';

export default function* feedPageSagas() {
  yield all([
    feedPagePageSagas()
  ]);
}
