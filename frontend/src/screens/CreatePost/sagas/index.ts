import { all } from 'redux-saga/effects';
import createPostPageSagas from '@screens/CreatePost/containers/CreatePostPage/sagas';

export default function* createPostSagas() {
  yield all([
    createPostPageSagas()
  ]);
}
