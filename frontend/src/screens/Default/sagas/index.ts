import { all } from 'redux-saga/effects';
import defaultPageSagas from '@screens/Default/containers/DefaultPage/sagas';

export default function* defaultSagas() {
  yield all([
    defaultPageSagas()
  ]);
}
