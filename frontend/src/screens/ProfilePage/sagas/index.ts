import { all } from 'redux-saga/effects';
import profileSagas from '@screens/ProfilePage/containers/ProfilePage/sagas';

export default function* profilePageSagas() {
  yield all([
    profileSagas()
  ]);
}
