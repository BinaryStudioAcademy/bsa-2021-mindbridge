import { all, call, put, takeEvery } from 'redux-saga/effects';
import { authUser, setToken } from '@root/services/auth.service';
import { loginRoutine, registerRoutine } from '../routines';

export function* login(request: any) {
  try {
    const response = yield call(authUser, { endpoint: 'login', payload: request.payload });
    setToken(response.accessToken, response.refreshToken);

    yield put(loginRoutine.success());
  } catch (ex) {
    yield put(loginRoutine.failure(ex.message));
  }
}

function* watchLogin() {
  yield takeEvery(loginRoutine.TRIGGER, login);
}

export function* register(request: any) {
  try {
    const response = yield call(authUser, { endpoint: 'register', payload: request.payload });
    setToken(response.accessToken, response.accessToken);

    yield put(registerRoutine.success());
  } catch (ex) {
    yield put(registerRoutine.failure(ex.message));
  }
}

function* watchRegister() {
  yield takeEvery(registerRoutine.TRIGGER, register);
}

export default function* authSagas() {
  yield all([
    watchLogin(),
    watchRegister()
  ]);
}
