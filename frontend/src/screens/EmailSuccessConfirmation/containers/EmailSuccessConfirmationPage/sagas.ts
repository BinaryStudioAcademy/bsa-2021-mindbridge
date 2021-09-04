import { all, call, put, takeEvery } from 'redux-saga/effects';
import emailService from '@screens/EmailSuccessConfirmation/services/emailService';
import { fetchUserRoutine } from '@screens/EmailSuccessConfirmation/routines';
import { history } from '@helpers/history.helper';

export default function* emailSuccessConfirmationPageSagas() {
  function* fetchData(action) {
    try {
      const response = yield call(emailService.getUserProfile, action.payload);
      yield put(fetchUserRoutine.success(response));
    } catch (error) {
      yield put(fetchUserRoutine.failure(error?.message));
    }
  }
  function* watchDataRequest() {
    yield takeEvery(fetchUserRoutine.TRIGGER, fetchData);
  }

  yield all([
    watchDataRequest()
  ]);
}
