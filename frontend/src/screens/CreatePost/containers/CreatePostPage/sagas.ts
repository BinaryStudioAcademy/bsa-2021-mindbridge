import { sendImageRoutine } from '../../routines/index';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import createPostService from '../../services';

function* fetchData(action) {
  console.log(action.payload);
  const formData = new FormData();
  formData.append('userFile', action.payload);
  try {
    const response = yield call(createPostService.sendImage, formData);
    yield put(sendImageRoutine.success(response));
  } catch (error) {
    yield put(sendImageRoutine.failure(error?.message));
    toastr.error('Error', 'Sanding image failed!');
  }
}

function* watchSendImageRequest() {
  yield takeEvery(sendImageRoutine.TRIGGER, fetchData);
}

export default function* createPostPageSagas() {
  yield all([
    watchSendImageRequest()
  ]);
}
