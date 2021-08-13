import {
  fetchTagsRoutine,
  sendImageRoutine,
  sendPostRoutine,
  fetchUserProfileRoutine,
  fetchPostRoutine, sendPRRoutine,
  getPostVersionsRoutine
} from '../../routines/index';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import createPostService from '@screens/CreatePost/services/createPost';
import { Routine } from 'redux-saga-routines';

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

function* fetchData(id) {
  try {
    const response = yield call(createPostService.getData, id.payload);
    yield put(fetchUserProfileRoutine.success(response));
  } catch (error) {
    yield put(fetchUserProfileRoutine.failure(error?.message));
  }
}

export function* getPostVersions() {
  try {
    const response = yield call(createPostService.getPostVersions);
    yield put(getPostVersionsRoutine.success(response));
  } catch (ex) {
    yield put(getPostVersionsRoutine.failure(ex.message));
  }
}

function* watchPostVersions() {
  yield takeEvery(getPostVersionsRoutine.TRIGGER, getPostVersions);
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
  } catch (error) {
    yield put(fetchTagsRoutine.failure(error?.message));
    toastr.error('Error', 'Loading tags failed!');
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchUserProfileRoutine.TRIGGER, fetchData);
}

function* watchFetchTagsRequest() {
  yield takeEvery(fetchTagsRoutine.TRIGGER, fetchTags);
}

function* fetchPost({ payload }: Routine<any>) {
  try {
    const response = yield call(createPostService.getPost, payload);

    yield put(fetchPostRoutine.success(response));
  } catch (error) {
    yield put(fetchPostRoutine.failure(error?.message));
    toastr.error('Error', 'Loading post failed');
  }
}

function* watchFetchPost() {
  yield takeEvery(fetchPostRoutine.TRIGGER, fetchPost);
}

function* sendPR({ payload }: Routine<any>) {
  try {
    const response = yield call(createPostService.sendPR, payload);

    yield put(sendPRRoutine.success(response));
  } catch (error) {
    yield put(sendPRRoutine.failure(error?.message));
    toastr.error('Error', 'Loading PR failed');
  }
}

function* watchSendPR() {
  yield takeEvery(sendPRRoutine.TRIGGER, sendPR);
}

export default function* defaultPageSagas() {
  yield all([
    watchPostVersions(),
    watchSendImageRequest(),
    watchSendPostRequest(),
    watchGetDataRequest(),
    watchFetchTagsRequest(),
    watchFetchPost(),
    watchSendPR()
  ]);
}
