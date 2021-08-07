import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchNotificationCountRoutine, fetchNotificationListRoutine } from '@screens/Header/routines';
import { toastr } from 'react-redux-toastr';
import headerService from '@screens/Header/services/header';

function* fetchNotificationCount() {
  try {
    const response = yield call(headerService.getNotificationCount);
    const count = { notificationCount: response };
    yield put(fetchNotificationCountRoutine.success(count));
  } catch (error) {
    yield put(fetchNotificationCountRoutine.failure(error?.message));
    toastr.error('Error', 'Loading notification count failed!');
  }
}

function* fetchNotificationList() {
  try {
    const response = yield call(headerService.getNotificationList);
    const list = { notificationList: response };
    yield put(fetchNotificationListRoutine.success(list));
  } catch (error) {
    yield put(fetchNotificationListRoutine.failure(error?.message));
    toastr.error('Error', 'Loading notification list failed!');
  }
}

function* watchFetchNotificationCount() {
  yield takeEvery(fetchNotificationCountRoutine.TRIGGER, fetchNotificationCount);
}

function* watchFetchNotificationList() {
  yield takeEvery(fetchNotificationListRoutine.TRIGGER, fetchNotificationList);
}

export default function* headerPageSagas() {
  yield all([
    watchFetchNotificationCount(),
    watchFetchNotificationList()
  ]);
}
