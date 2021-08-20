import { all } from 'redux-saga/effects';
import postVersionPagePageSagas from '@screens/PostVersionPage/containers/PostVersionPagePage/sagas';

export default function* postVersionPageSagas() {
  yield all([
    postVersionPagePageSagas()
  ]);
}
