import { all, call, put, takeEvery } from 'redux-saga/effects';
import postPageService from '@screens/PostPage/services/PostPage';
import { fetchUserProfileRoutine } from '@screens/PostPage/routines';
import emailService from '@screens/EmailSuccessConfirmation/services/emailService';
import { fetchDataRoutine } from '@screens/EmailSuccessConfirmation/routines';
import { toastr } from 'react-redux-toastr';

export default function* emailSuccessConfirmationPageSagas() {
  function* fetchData(action) {
    try {
      const response = yield call(emailService.getUserProfile, action.payload);
      yield put(fetchDataRoutine.success(response));
      toastr.success('Success', 'Loading data success');
    } catch (error) {
      yield put(fetchDataRoutine.failure(error?.message));
      toastr.error('Error', 'Loading data failed');
    }
  }
  function* watchDataRequest() {
    yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
  }

  yield all([
    watchDataRequest()
  ]);
}
