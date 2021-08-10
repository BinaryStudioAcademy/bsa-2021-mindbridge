import { all } from 'redux-saga/effects';
import viewPostPageSagas from '@screens/ViewPost/containers/ViewPostPage/sagas';

export default function* viewPostSagas() {
  yield all([
    viewPostPageSagas()
  ]);
}
