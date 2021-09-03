import { all } from 'redux-saga/effects';
import highlightsPageSagas from '@screens/HighlightsPage/containers/HighlightsPage/sagas';

export default function* highlightsSagas() {
  yield all([
    highlightsPageSagas()
  ]);
}
