import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchNotificationCountRoutine,
  fetchNotificationListRoutine, markAllNotificationsReadRoutine, markNotificationReadRoutine,
  searchPostsByElasticRoutine
} from '@screens/Header/routines';
import { toastr } from 'react-redux-toastr';
import { Routine } from 'redux-saga-routines';
import headerService from '@screens/Header/services/header';

function* fetchNotificationCount({ payload }: Routine<any>) {
  try {
    const response = yield call(headerService.getNotificationCount, payload);
    const count = { notificationCount: response };
    yield put(fetchNotificationCountRoutine.success(count));
  } catch (error) {
    yield put(fetchNotificationCountRoutine.failure(error?.message));
    toastr.error('Error', 'Loading notification count failed!');
  }
}

function* fetchNotificationList({ payload }: Routine<any>) {
  try {
    let response;
    if (payload.onlyUnread) {
      response = yield call(headerService.getUnreadNotificationList, payload.userId);
    } else {
      response = yield call(headerService.getNotificationList, payload.userId);
    }
    const list = { notificationList: response, onlyUnread: payload.onlyUnread };
    yield put(fetchNotificationListRoutine.success(list));
  } catch (error) {
    yield put(fetchNotificationListRoutine.failure(error?.message));
    toastr.error('Error', 'Loading notification list failed!');
  }
}

function* searchPostsByElastic({ payload }: Routine<any>) {
  try {
    const params = {
      query: payload
    };
    const response = yield call(headerService.getPostByElastic, params);
    const posts = {
      posts: response
    };
    yield put(searchPostsByElasticRoutine.success(posts));
  } catch (error) {
    yield put(searchPostsByElasticRoutine.failure(error?.message));
    toastr.error('Error', 'Loading posts by elastic failed');
  }
}

function* markNotificationRead({ payload }: Routine<any>) {
  try {
    yield call(headerService.markNotificationRead, payload);
    yield put(markNotificationReadRoutine.success(payload));
  } catch (error) {
    yield put(markNotificationReadRoutine.failure(error?.message));
    toastr.error('Error', 'Update notification failed');
  }
}

function* markAllNotificationsRead({ payload }: Routine<any>) {
  try {
    yield call(headerService.markAllNotificationsRead, payload);
    yield put(markAllNotificationsReadRoutine.success(payload));
  } catch (error) {
    yield put(markAllNotificationsReadRoutine.failure(error?.message));
    toastr.error('Error', 'Update notifications failed');
  }
}

function* watchMarkAllNotificationsRead() {
  yield takeEvery(markAllNotificationsReadRoutine.TRIGGER, markAllNotificationsRead);
}

function* watchFetchNotificationCount() {
  yield takeEvery(fetchNotificationCountRoutine.TRIGGER, fetchNotificationCount);
}

function* watchFetchNotificationList() {
  yield takeEvery(fetchNotificationListRoutine.TRIGGER, fetchNotificationList);
}

function* watchSearchPostsByElastic() {
  yield takeEvery(searchPostsByElasticRoutine.TRIGGER, searchPostsByElastic);
}

function* watchMarkNotificationRead() {
  yield takeEvery(markNotificationReadRoutine.TRIGGER, markNotificationRead);
}

export default function* headerPageSagas() {
  yield all([
    watchFetchNotificationCount(),
    watchFetchNotificationList(),
    watchSearchPostsByElastic(),
    watchMarkNotificationRead(),
    watchMarkAllNotificationsRead()
  ]);
}
