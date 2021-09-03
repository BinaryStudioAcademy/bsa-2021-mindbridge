import { all, call, put, takeEvery } from 'redux-saga/effects';
import emailService from '@screens/EmailSuccessConfirmation/services/emailService';
import { fetchDataRoutine } from '@screens/EmailSuccessConfirmation/routines';
import { toastr } from 'react-redux-toastr';
import { history } from '@helpers/history.helper';

export default function* emailSuccessConfirmationPageSagas() {
  function* fetchData(action) {
    try {
      const response = yield call(emailService.getUserProfile, action.payload);
      yield put(fetchDataRoutine.success(response));
      toastr.success('Success', 'Loading data success');
    } catch (error) {
      yield put(fetchDataRoutine.failure(error?.message));
      history.push('/');
    }
  }
  function* watchDataRequest() {
    yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
  }

  yield all([
    watchDataRequest()
  ]);
}
