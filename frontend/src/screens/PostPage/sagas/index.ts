import { all } from 'redux-saga/effects';
import defaultPostPageSagas from '@screens/PostPage/containers/sagas';

export default function* postPageSagas() {
  yield all([
    defaultPostPageSagas()
  ]);
}
