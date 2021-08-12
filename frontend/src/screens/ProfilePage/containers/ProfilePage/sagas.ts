import { sendFormRoutine } from '@screens/ProfilePage/routines';
import { call, put } from 'redux-saga/effects';
import createPostService from '@screens/CreatePost/services/createPost';
import { sendImageRoutine, sendPostRoutine } from '@screens/CreatePost/routines';
import { toastr } from 'react-redux-toastr';

function* sendForm(action) {
  try {
    const response = yield call(createPostService.sendPost, action.payload);
    yield put(sendPostRoutine.success(response));
    toastr.success('Success', 'Post was sent!');
  } catch (error) {
    yield put(sendImageRoutine.failure(error?.message));
    toastr.error('Error', 'Sending post failed!');
  }
}
