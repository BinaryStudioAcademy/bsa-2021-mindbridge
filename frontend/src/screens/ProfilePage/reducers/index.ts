import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { profilePageReducer } from '@screens/ProfilePage/containers/reducer';
import { sendFormRoutine, sendNicknameRoutine, toggleFollowUserRoutine } from '@screens/ProfilePage/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  sendFormRequest: reducerCreator([sendFormRoutine.TRIGGER]),
  sendNicknameRequest: reducerCreator([sendNicknameRoutine.TRIGGER, sendNicknameRoutine.SUCCESS]),
  toggleFollowUserRequest: reducerCreator([toggleFollowUserRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: profilePageReducer
});

const reqs = (state: RootState) => state.profilePageReducer.requests;
const data = (state: RootState) => state.profilePageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractToggleFollowUserLoading = state => reqs(state).toggleFollowUserRequest.loading;
export const extractSendFormLoading = state => reqs(state).sendFormRequest.loading;
export const extractSendFormError = state => reqs(state).sendFormRequest.error;
export const extractSendNicknameLoading = state => reqs(state).sendNicknameRequest.loading;
export const extractSendNicknameError = state => reqs(state).sendNicknameRequest.error;

export const extractData = state => data(state);

