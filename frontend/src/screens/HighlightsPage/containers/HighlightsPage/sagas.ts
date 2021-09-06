import { all, call, put, takeEvery } from 'redux-saga/effects';
import highlightsPageService from '@screens/HighlightsPage/services';
import {
  fetchHighlightsRoutine,
  deleteHighlightRoutine,
  fetchHighlightsWithoutPaginationRoutine
} from '@screens/HighlightsPage/routines';
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

function* fetchHighlightsWithPagination(action) {
  try {
    const response = yield call(highlightsPageService.getHighlightsWithPagination, action.payload);
    yield put(fetchHighlightsWithoutPaginationRoutine.success(response));
  } catch (error) {
    yield put(fetchHighlightsWithoutPaginationRoutine.failure(error?.message));
    toastr.error('Error', 'Loading failed');
  }
}

function* deleteHighlight(action) {
  try {
    const response = yield call(highlightsPageService.deleteHighlight, action.payload);
    yield put(deleteHighlightRoutine.success(response));
    toastr.success('Success', 'Highlight deleted');
  } catch (error) {
    yield put(deleteHighlightRoutine.failure(error?.message));
    toastr.error('Error', 'Delete highlight failed');
  }
}

function* watchFetchHighlights() {
  yield takeEvery(fetchHighlightsRoutine.TRIGGER, fetchHighlights);
}

function* watchDeleteHighlight() {
  yield takeEvery(deleteHighlightRoutine.TRIGGER, deleteHighlight);
}

function* watchFetchHighlightsWithPagination() {
  yield takeEvery(fetchHighlightsWithoutPaginationRoutine.TRIGGER, fetchHighlightsWithPagination);
}

export default function* highlightsPageSagas() {
  yield all([
    watchFetchHighlights(),
    watchDeleteHighlight(),
    watchFetchHighlightsWithPagination()
  ]);
}
