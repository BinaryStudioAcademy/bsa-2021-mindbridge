import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { createPostReducer } from '@screens/CreatePost/containers/CreatePostPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { sendPostRoutine, sendImageRoutine } from '@screens/CreatePost/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  sendPostRequest: reducerCreator([sendPostRoutine.TRIGGER]),
  sendImageRequest: reducerCreator([sendImageRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: createPostReducer
});

const reqs = (state: RootState) => state.createPostReducer.requests;
const data = (state: RootState) => state.createPostReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractSendPostLoading = state => reqs(state).sendPostRequest.loading;
export const extractSendPostError = state => reqs(state).sendPostRequest.error;
export const extractSendImageLoading = state => reqs(state).sendImageRequest.loading;
export const extractSendImageError = state => reqs(state).sendImageRequest.error;
