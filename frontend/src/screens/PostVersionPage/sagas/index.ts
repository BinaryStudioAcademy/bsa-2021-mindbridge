import { all } from 'redux-saga/effects';
import postVersionPageSagas from '@screens/PostVersionPage/containers/PostVersionPage/sagas';

export default function* postVersionSagas() {
  yield all([
    postVersionPageSagas()
  ]);
}
