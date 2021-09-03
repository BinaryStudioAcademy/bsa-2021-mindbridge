import { all, call, put, takeEvery } from 'redux-saga/effects';
import postPageService from '@screens/PostPage/services/PostPage';
import { fetchUserProfileRoutine } from '@screens/PostPage/routines';
import emailService from '@screens/EmailSuccessConfirmation/services/emailService';
import { fetchDataRoutine } from '@screens/ViewPost/routines';
import { verifiedKeyRoutine } from '@screens/EmailSuccessConfirmation/routines';
import { toastr } from 'react-redux-toastr';

export default function* emailSuccessConfirmationPageSagas() {
  function* fetchUserProfile(action) {
    try {
      const response = yield call(emailService.getUserProfile, action.payload);
      console.log(response);
      yield put(verifiedKeyRoutine.success(response));
      toastr.success('SUCCESS', 'user get');
    } catch (error) {
      yield put(verifiedKeyRoutine.failure(error?.message));
      toastr.error('ERROR', 'user not get');
    }
  }

  function* watchDataRequest() {
    yield takeEvery(verifiedKeyRoutine.TRIGGER, fetchUserProfile);
  }

  yield all([
    watchDataRequest()
  ]);
}
