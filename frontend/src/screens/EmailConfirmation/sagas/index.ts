import { all } from 'redux-saga/effects';
import emailConfirmationPageSagas from '@screens/EmailConfirmation/containers/EmailConfirmationPage/sagas';

export default function* emailConfirmationSagas() {
  yield all([
    emailConfirmationPageSagas()
  ]);
}
