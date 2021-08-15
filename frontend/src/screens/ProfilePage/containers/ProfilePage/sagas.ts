import { sendFormRoutine, sendNicknameRoutine } from '@screens/ProfilePage/routines';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import profilePageService from '@screens/ProfilePage/services/profilePage';
import { loginRoutine } from '@screens/Login/routines';

/* eslint-disable max-len*/
function* sendNickname(action) {
  try {
    const response = yield call(profilePageService.sendNickname, { endpoint: 'nickname', payload: action.payload.nickname });
    yield put(sendNicknameRoutine.success(response));
    return response;
  } catch (error) {
    yield put(sendFormRoutine.failure(error?.message));
    toastr.error('Error', 'Sending nickname failed!');
    return null;
  }
}

function* sendForm(action) {
  const isNicknameEngaged = yield sendNickname(action);
  if (!isNicknameEngaged) {
    try {
      const response = yield call(profilePageService.sendForm, { endpoint: action.payload.id, payload: action.payload });
      yield put(loginRoutine.success(response));
      yield put(sendFormRoutine.success(response));
      toastr.success('Success', 'Data changed successfully!');
    } catch (error) {
      yield put(sendFormRoutine.failure(error?.message));
      toastr.error('Error', 'Sending form failed!');
    }
  } else if (isNicknameEngaged) {
    yield put(sendFormRoutine.failure('This nickname is already in use!'));
    toastr.error('Error', 'This nickname is already in use!');
  }
}

function* watchSendFormRequest() {
  yield takeEvery(sendFormRoutine.TRIGGER, sendForm);
}

function* watchSendNicknameRequest() {
  yield takeEvery(sendNicknameRoutine.TRIGGER, sendNickname);
}

export default function* defaultProfileSagas() {
  yield all([
    watchSendFormRequest(),
    watchSendNicknameRequest()
  ]);
}

