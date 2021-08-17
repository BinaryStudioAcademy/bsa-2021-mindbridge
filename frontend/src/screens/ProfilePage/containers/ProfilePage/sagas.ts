import {
  sendFormRoutine,
  sendNicknameRoutine,
  sendAvatarRoutine
} from '@screens/ProfilePage/routines';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import profilePageService from '@screens/ProfilePage/services/profilePage';
import { updateUserAvatar, updateUserRoutine } from '@screens/Login/routines';

/* eslint-disable max-len*/
function* sendForm(action) {
  try {
    const response = yield call(profilePageService.sendForm, { endpoint: action.payload.id, payload: action.payload });
    yield put(updateUserRoutine.success(response));
    yield put(sendFormRoutine.success(response));
    toastr.success('Success', 'Data changed successfully!');
  } catch (error) {
    yield put(sendFormRoutine.failure(error?.message));
    toastr.error('Error', 'Sending form failed!');
  }
}

function* sendNickname(action) {
  try {
    const response = yield call(profilePageService.sendNickname, { endpoint: 'nickname', payload: action.payload });
    yield put(sendNicknameRoutine.success(response));
  } catch (error) {
    yield put(sendFormRoutine.failure(error?.message));
    toastr.error('Error', 'Sending nickname failed!');
  }
}

function* sendAvatar(action) {
  const formData = new FormData();
  formData.append('file', action.payload.avatar);
  try {
    const url = yield call(profilePageService.sendAvatar, { endpoint: 'save', payload: formData });
    yield call(profilePageService.updateAvatar, { endpoint: action.payload.userId, payload: url });
    yield put(updateUserAvatar.success(url));
    yield put(sendAvatarRoutine.success(url));
    toastr.success('Success', 'Avatar changed successfully!');
  } catch (error) {
    yield put(sendAvatarRoutine.failure(error?.message));
    toastr.error('Error', 'Sending avatar failed!');
  }
}

function* watchSendFormRequest() {
  yield takeEvery(sendFormRoutine.TRIGGER, sendForm);
}

function* watchSendNicknameRequest() {
  yield takeEvery(sendNicknameRoutine.TRIGGER, sendNickname);
}

function* watchSendAvatarRequest() {
  yield takeEvery(sendAvatarRoutine.TRIGGER, sendAvatar);
}

export default function* defaultProfileSagas() {
  yield all([
    watchSendFormRequest(),
    watchSendNicknameRequest(),
    watchSendAvatarRequest()
  ]);
}

