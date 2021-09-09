import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchPopularTagsRoutine } from '@screens/Sidebar/routines';
import sidebarPageService from '@screens/Sidebar/services/sidearPage';
import { toastr } from 'react-redux-toastr';

function* fetchPopularTags() {
  try {
    const response = yield call(sidebarPageService.getPopularTags);
    yield put(fetchPopularTagsRoutine.success(response));
  } catch (error) {
    yield put(fetchPopularTagsRoutine.failure(error?.message));
    toastr.error('Error', 'Getting popular tags failed!');
  }
}

function* watchFetchPopularTagsRequest() {
  yield takeEvery(fetchPopularTagsRoutine.TRIGGER, fetchPopularTags);
}

export default function* sidebarPageSagas() {
  yield all([
    watchFetchPopularTagsRequest()
  ]);
}
