import { all } from 'redux-saga/effects';
// eslint-disable-next-line max-len
import emailSuccessConfirmationPageSagas from '@screens/EmailSuccessConfirmation/containers/EmailSuccessConfirmationPage/sagas';

export default function* emailSuccessConfirmationSagas() {
  yield all([
    emailSuccessConfirmationPageSagas()
  ]);
}
