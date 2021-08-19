import { all } from 'redux-saga/effects';
import postVersionsPageSagas from '@screens/PostVersions/containers/PostVersionsPage/sagas';

export default function* postVersionsSagas() {
  yield all([
    postVersionsPageSagas()
  ]);
}
