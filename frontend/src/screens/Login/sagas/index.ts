import { all } from 'redux-saga/effects';
import loginPageSagas from '@screens/Login/containers/LoginPage/sagas';

export default function* loginSagas() {
  yield all([
    loginPageSagas()
  ]);
}
