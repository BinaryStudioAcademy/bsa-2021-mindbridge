import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { feedPageReducer } from '@screens/FeedPage/containers/FeedPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {addMorePostsRoutine, disLikePostRoutine, fetchDataRoutine, likePostRoutine} from '@screens/FeedPage/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchDataRequest: reducerCreator([fetchDataRoutine.TRIGGER]),
  addMorePostsRequest: reducerCreator([addMorePostsRoutine.TRIGGER]),
  likePostRequest: reducerCreator([likePostRoutine.TRIGGER]),
  disLikePostRequest: reducerCreator([disLikePostRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: feedPageReducer
});

const reqs = (state: RootState) => state.feedPageReducer.requests;
const data = (state: RootState) => state.feedPageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchDataLoading = state => reqs(state).fetchDataRequest.loading;
export const extractFetchDataError = state => reqs(state).fetchDataRequest.error;

export const extractData = state => data(state);

