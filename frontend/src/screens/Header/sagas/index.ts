import { all } from 'redux-saga/effects';
import headerPageSagas from '@screens/Header/containers/HeaderPage/sagas';

export default function* headerSagas() {
  yield all([
    headerPageSagas()
  ]);
}
