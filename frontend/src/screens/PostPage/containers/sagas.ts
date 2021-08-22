import {
  fetchTagsRoutine,
  sendImageRoutine,
  sendPostRoutine,
  fetchUserProfileRoutine,
  fetchPostRoutine, sendPRRoutine,
  getPostVersionsRoutine, editPostRoutine, setLoaderRoutine
} from '../routines/index';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import postPageService from '@screens/PostPage/services/PostPage';
import { Routine } from 'redux-saga-routines';
import { history } from '@helpers/history.helper';

function* sendImage(action) {
  const formData = new FormData();
  formData.append('file', action.payload.file);
  try {
    const response = yield call(postPageService.sendImage, formData);
    yield put(sendImageRoutine.success(response));
    toastr.success('Success', 'Image was sent!');
  } catch (error) {
    yield put(sendImageRoutine.failure(error?.message));
    toastr.error('Error', 'Sending image failed!');
  }
}

function* sendPost(action) {
  try {
    const response = yield call(postPageService.sendPost, action.payload);
    yield put(sendPostRoutine.success(response));
    toastr.success('Success', 'Post was sent!');
    history.push(`/post/${response}`);
  } catch (error) {
    yield put(sendPostRoutine.failure(error?.message));
    toastr.error('Error', 'Sending post failed!');
  } finally {
    yield put(sendPostRoutine.fulfill());
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
    const response = yield call(postPageService.getData, id.payload);
    yield put(fetchUserProfileRoutine.success(response));
  } catch (error) {
    yield put(fetchUserProfileRoutine.failure(error?.message));
  }
}

export function* getPostVersions({ payload }: Routine<any>) {
  try {
    const response = yield call(postPageService.getPostVersions, payload);
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
    const response = yield call(postPageService.getTags);
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
    yield put(setLoaderRoutine.success({ isLoading: true }));
    const response = yield call(postPageService.getPost, payload);
    yield put(setLoaderRoutine.success({ isLoading: false }));

    yield put(fetchPostRoutine.success(response));
  } catch (error) {
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: null }));
    yield put(fetchPostRoutine.failure(error?.message));
    toastr.error('Error', 'Loading post failed');
  }
}

function* watchFetchPost() {
  yield takeEvery(fetchPostRoutine.TRIGGER, fetchPost);
}

function* sendPR({ payload }: Routine<any>) {
  try {
    const response = yield call(postPageService.sendPR, payload);
    yield put(sendPRRoutine.success(response));
    toastr.success('Success', 'Pull request has been created');
    history.push(`/post/${payload.postId}`);
  } catch (error) {
    yield put(sendPRRoutine.failure(error?.message));
    toastr.error('Error', 'Loading PR failed');
  } finally {
    yield put(sendPRRoutine.fulfill());
  }
}

function* watchSendPR() {
  yield takeEvery(sendPRRoutine.TRIGGER, sendPR);
}

function* editPost({ payload }: Routine<any>) {
  try {
    const response = yield call(postPageService.editPost, payload);
    yield put(editPostRoutine.success(response));
    toastr.success('Success', 'Post has been edited');
    history.push(`/post/${payload.postId}`);
  } catch (error) {
    yield put(editPostRoutine.failure(error?.message));
    toastr.error('Error', 'Editing post failed');
  } finally {
    yield put(editPostRoutine.fulfill());
  }
}

function* watchEditPost() {
  yield takeEvery(editPostRoutine.TRIGGER, editPost);
}

export default function* defaultPostPageSagas() {
  yield all([
    watchPostVersions(),
    watchSendImageRequest(),
    watchSendPostRequest(),
    watchGetDataRequest(),
    watchFetchTagsRequest(),
    watchFetchPost(),
    watchSendPR(),
    watchEditPost()
  ]);
}
