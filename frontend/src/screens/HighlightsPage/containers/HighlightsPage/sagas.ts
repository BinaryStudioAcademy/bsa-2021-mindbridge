import { all, call, put, takeEvery } from 'redux-saga/effects';
import highlightsPageService from '@screens/HighlightsPage/services';
import { fetchHighlightsRoutine } from '@screens/HighlightsPage/routines';
import { toastr } from 'react-redux-toastr';

function* fetchHighlights(action) {
  try {
    const response = yield call(highlightsPageService.getHighlights, action.payload);
    yield put(fetchHighlightsRoutine.success(response));
  } catch (error) {
    yield put(fetchHighlightsRoutine.failure(error?.message));
    toastr.error('Error', 'Loading failed');
  }
}

function* watchFetchHighlights() {
  yield takeEvery(fetchHighlightsRoutine.TRIGGER, fetchHighlights);
}

export default function* highlightsPageSagas() {
  yield all([
    watchFetchHighlights()
  ]);
}
