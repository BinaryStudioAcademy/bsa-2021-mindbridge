import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { feedPageReducer } from '@screens/FeedPage/containers/FeedPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { fetchAllUsersNumberRoutine } from '@screens/FeedPage/routines';
import {
  addMorePostsRoutine,
  disLikePostRoutine,
  fetchDataRoutine,
  likePostRoutine, searchPostsRoutine
} from '@screens/FeedPage/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchAllUsersNumberRequest: reducerCreator([fetchAllUsersNumberRoutine.TRIGGER]),
  fetchDataRequest: reducerCreator([fetchDataRoutine.TRIGGER]),
  addMorePostsRequest: reducerCreator([addMorePostsRoutine.TRIGGER]),
  likePostRequest: reducerCreator([likePostRoutine.TRIGGER]),
  disLikePostRequest: reducerCreator([disLikePostRoutine.TRIGGER]),
  searchPostsRequest: reducerCreator([searchPostsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: feedPageReducer
});

const reqs = (state: RootState) => state.feedPageReducer.requests;
const data = (state: RootState) => state.feedPageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchAllUsersNumberLoading = state => reqs(state).fetchAllUsersNumberRequest.loading;
export const extractFetchAllUsersNumberError = state => reqs(state).fetchAllUsersNumberRequest.error;
export const extractSearchPostsLoading = state => reqs(state).searchPostsRequest.loading;
export const extractFetchDataLoading = state => reqs(state).fetchDataRequest.loading;
export const extractFetchDataError = state => reqs(state).fetchDataRequest.error;

export const extractData = state => data(state);

