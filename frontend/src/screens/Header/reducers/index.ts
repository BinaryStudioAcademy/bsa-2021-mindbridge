import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { headerReducer } from '@screens/Header/containers/HeaderPage/reducer';
import { fetchNotificationListRoutine, markAllNotificationsReadRoutine } from '@screens/Header/routines';
import { reducerCreator } from '@helpers/reducer.helper';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchNotificationListRequest: reducerCreator([fetchNotificationListRoutine.TRIGGER]),
  markAllNotificationsReadRequest: reducerCreator([markAllNotificationsReadRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: headerReducer
});

const reqs = (state: RootState) => state.headerReducer.requests;
const data = (state: RootState) => state.headerReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchNotificationListLoading = state => reqs(state).fetchNotificationListRequest.loading;
export const extractMarkAllNotificationsReadLoading = state => reqs(state).markAllNotificationsReadRequest.loading;

export const extractData = state => data(state);
