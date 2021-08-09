import { all } from 'redux-saga/effects';
import pageNotFoundPageSagas from '@screens/NotFound/containers/NotFoundPage/sagas';

export default function* pageNotFoundSagas() {
  yield all([
    pageNotFoundPageSagas()
  ]);
}
