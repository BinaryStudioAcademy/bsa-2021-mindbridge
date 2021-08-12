import { fetchTagsRoutine, sendImageRoutine, sendPostRoutine, fetchDataRoutine } from '../../routines/index';

import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import createPostService from '@screens/CreatePost/services/createPost';

function* sendImage(action) {
  const formData = new FormData();
  formData.append('file', action.payload.file);
  try {
    const response = yield call(createPostService.sendImage, formData);
    yield put(sendImageRoutine.success(response));
    toastr.success('Success', 'Image was sent!');
  } catch (error) {
    yield put(sendImageRoutine.failure(error?.message));
    toastr.error('Error', 'Sending image failed!');
  }
}

function* sendPost(action) {
  try {
    const response = yield call(createPostService.sendPost, action.payload);
    yield put(sendPostRoutine.success(response));
    toastr.success('Success', 'Post was sent!');
  } catch (error) {
    yield put(sendImageRoutine.failure(error?.message));
    toastr.error('Error', 'Sending post failed!');
  }
}

function* watchSendImageRequest() {
  yield takeEvery(sendImageRoutine.TRIGGER, sendImage);
}

function* watchSendPostRequest() {
  yield takeEvery(sendPostRoutine.TRIGGER, sendPost);
}

function* fetchData() {
  try {
    const response = yield call(createPostService.getData);
    yield put(fetchDataRoutine.success(response));
    toastr.success('Success', 'Data loaded!');
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading failed!');
  }
}

function* fetchTags() {
  try {
    const response = yield call(createPostService.getTags);
    const allTags = [];
    response.forEach(element => {
      const tag = { key: element.id, value: element.id, text: element.name };
      allTags.push(tag);
    });
    yield put(fetchTagsRoutine.success(allTags));
    toastr.success('Success', 'Tags loaded!');
  } catch (error) {
    yield put(fetchTagsRoutine.failure(error?.message));
    toastr.error('Error', 'Loading tags failed!');
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

function* watchFetchTagsRequest() {
  yield takeEvery(fetchTagsRoutine.TRIGGER, fetchTags);
}

export default function* defaultPageSagas() {
  yield all([
    watchSendImageRequest(),
    watchSendPostRequest(),
    watchGetDataRequest(),
    watchFetchTagsRequest()
  ]);
}
