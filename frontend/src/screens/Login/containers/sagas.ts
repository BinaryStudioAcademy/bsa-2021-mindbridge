import { all, call, put, takeEvery } from 'redux-saga/effects';
import { authUser, getCurrentUser, setToken } from '@root/services/auth.service';
import { loginRoutine, registerRoutine } from '../routines';
import { REFRESH_TOKEN } from '@screens/Login/constants/auth_constants';
import { toastr } from 'react-redux-toastr';

export function* login(request: any) {
  try {
    const response = yield call(authUser, { endpoint: 'login', payload: request.payload });
    setToken(response.tokens.accessToken, response.tokens.refreshToken);

    yield put(loginRoutine.success(response.user));
  } catch (ex) {
    yield put(loginRoutine.failure(ex.message));
    toastr.error('Failed to log in', 'Email or password is incorrect');
  }
}

function* watchLogin() {
  yield takeEvery(loginRoutine.TRIGGER, login);
}

export function* register(request: any) {
  try {
    const response = yield call(authUser, { endpoint: 'register', payload: request.payload });
    setToken(response.tokens.accessToken, response.tokens.refreshToken);

    yield put(registerRoutine.success(response.user));
  } catch (ex) {
    yield put(registerRoutine.failure(ex.message));
  }
}

function* watchRegister() {
  yield takeEvery(registerRoutine.TRIGGER, register);
}

function* loadUser() {
  try {
    const currentUser = yield call(getCurrentUser, { refreshToken: localStorage.getItem(REFRESH_TOKEN) });
    yield put(loginRoutine.success(currentUser));
  } catch (ex) {
    yield put(loginRoutine.failure(ex.message));
  }
}

export default function* authSagas() {
  yield all([
    loadUser(),
    watchLogin(),
    watchRegister()
  ]);
}
