import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { createPostReducer } from '@screens/CreatePost/containers/CreatePostPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { changeHtmlMarkdownModeRoutine, changeEditViewModeRoutine } from '@screens/CreatePost/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  changeHtmlMarkdownModeRequest: reducerCreator([changeHtmlMarkdownModeRoutine.TRIGGER]),
  changeEditViewModeRequest: reducerCreator([changeEditViewModeRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: createPostReducer
});

const reqs = (state: RootState) => state.createPostReducer.requests;
const data = (state: RootState) => state.createPostReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractChangeHtmlMarkdownModeLoading = state => reqs(state).changeHtmlMarkdownModeRequest.loading;
export const extractChangeHtmlMarkdownModeError = state => reqs(state).changeHtmlMarkdownModeRequest.error;
export const extractChangeEditViewModeLoading = state => reqs(state).changeEditViewModeRequest.loading;
export const extractChangeEditViewModeError = state => reqs(state).changeEditViewModeRequest.error;
