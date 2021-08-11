import { all } from 'redux-saga/effects';
import auth from '../containers/sagas';

export default function* authSagas() {
  yield all([
    auth()
  ]);
}
