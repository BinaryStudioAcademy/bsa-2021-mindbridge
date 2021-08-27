import { all } from 'redux-saga/effects';
import draftsPageSagas from '@screens/Drafts/containers/DraftsPage/sagas';

export default function* draftsSagas() {
  yield all([
    draftsPageSagas()
  ]);
}
