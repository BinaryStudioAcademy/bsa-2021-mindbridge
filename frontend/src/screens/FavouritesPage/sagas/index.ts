import { all } from 'redux-saga/effects';
import favouritesPagePageSagas from '@screens/FavouritesPage/containers/FavouritesPagePage/sagas';

export default function* favouritesPageSagas() {
  yield all([
    favouritesPagePageSagas()
  ]);
}
