import { sendImageRoutine, sendPostRoutine } from '../../routines/index';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import createPostService from '../../services';

function* sendImage(action) {
  console.log(action.payload);
  const formData = new FormData();
  formData.append('userFile', action.payload);
  try {
    const response = yield call(createPostService.sendImage, formData);
    yield put(sendImageRoutine.success(response));
    toastr.error('Success', 'Image sended!');
  } catch (error) {
    yield put(sendImageRoutine.failure(error?.message));
    toastr.error('Error', 'Sanding image failed!');
  }
}

function* sendPost(action) {
  try {
    const response = yield call(createPostService.sendPost, action.payload);
    yield put(sendPostRoutine.success(response));
    toastr.success('Success', 'Post sended!');
  } catch (error) {
    yield put(sendImageRoutine.failure(error?.message));
    toastr.error('Error', 'Sanding post failed!');
  }
}

function* watchSendImageRequest() {
  yield takeEvery(sendImageRoutine.TRIGGER, sendImage);
}

function* watchSendPostRequest() {
  yield takeEvery(sendPostRoutine.TRIGGER, sendPost);
}

export default function* createPostPageSagas() {
  yield all([
    watchSendImageRequest(),
    watchSendPostRequest()
  ]);
}
