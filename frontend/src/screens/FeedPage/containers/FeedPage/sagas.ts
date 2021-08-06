import { all, call, put, takeEvery } from 'redux-saga/effects';
import feedPageService from '@screens/FeedPage/services/feedPage';
import { toastr } from 'react-redux-toastr';
import { fetchDataRoutine } from '@screens/FeedPage/routines';

function* fetchData() {
  try {
    const response = yield call(feedPageService.getData);
    const postsList = { posts: response };
    yield put(fetchDataRoutine.success(postsList));
    /* toastr.success('Success', 'Data loaded!');*/
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    /* toastr.error('Error', 'Loading failed!');*/
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

export default function* feedPageSagas() {
  yield all([
    watchGetDataRequest()
  ]);
}
