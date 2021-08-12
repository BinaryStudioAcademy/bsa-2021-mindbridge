import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { createPostReducer } from '@screens/CreatePost/containers/CreatePostPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  sendPostRoutine, sendImageRoutine, resetLoadingImageRoutine,
  fetchDataRoutine, fetchTagsRoutine, fetchPostRoutine, sendPRRoutine,
  getPostVersionsRoutine, editPostRoutine
} from '@screens/CreatePost/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchTagsRequest: reducerCreator([fetchTagsRoutine.TRIGGER]),
  resetLoadingImageRequest: reducerCreator([resetLoadingImageRoutine.TRIGGER]),
  sendPostRequest: reducerCreator([sendPostRoutine.TRIGGER]),
  sendImageRequest: reducerCreator([sendImageRoutine.TRIGGER]),
  fetchDataRequest: reducerCreator[fetchDataRoutine.TRIGGER],
  fetchPostRequest: reducerCreator[fetchPostRoutine.TRIGGER],
  sendPRRequest: reducerCreator[sendPRRoutine.TRIGGER],
  editPostRequest: reducerCreator[editPostRoutine.TRIGGER],
  getPostVersionsRequest: reducerCreator[getPostVersionsRoutine.TRIGGER]
});

export default combineReducers({
  requests,
  data: createPostReducer
});

const reqs = (state: RootState) => state.createPostReducer.requests;
const data = (state: RootState) => state.createPostReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchTagsLoading = state => reqs(state).fetchTagsRequest.loading;
export const extractFetchTagsError = state => reqs(state).fetchTagsRequest.error;
export const extractResetLoadingImageLoading = state => reqs(state).resetLoadingImageRequest.loading;
export const extractResetLoadingImageError = state => reqs(state).resetLoadingImageRequest.error;
export const extractSendPostLoading = state => reqs(state).sendPostRequest.loading;
export const extractSendPostError = state => reqs(state).sendPostRequest.error;
export const extractSendImageLoading = state => reqs(state).sendImageRequest.loading;
export const extractSendImageError = state => reqs(state).sendImageRequest.error;
export const extractData = state => data(state);
