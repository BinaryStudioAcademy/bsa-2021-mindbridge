import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '@screens/Header/models/INotification';
import {
  fetchNotificationCountRoutine,
  fetchNotificationListRoutine, markAllNotificationsReadRoutine, markNotificationReadRoutine,
  searchPostsByElasticRoutine
} from '@screens/Header/routines';
import { INotificationList } from '@screens/Header/models/INotificationList';
import { INotificationCount } from '@screens/Header/models/INotificationCount';
import { IPost } from '@screens/Header/models/IPost';
import { IPostsPayload } from '@screens/Header/models/IPostsPayload';

export interface IHeaderReducerState {
  notificationCount: number;
  notificationList: INotification[];
  posts: IPost[];
  onlyUnread: boolean;
}

const initialState: IHeaderReducerState = {
  notificationCount: 0,
  notificationList: [],
  onlyUnread: true,
  posts: []
};

export const headerReducer = createReducer(initialState, {
  [fetchNotificationCountRoutine.SUCCESS]: (state, { payload }: PayloadAction<INotificationCount>) => {
    state.notificationCount = payload.notificationCount;
  },
  [fetchNotificationListRoutine.SUCCESS]: (state, { payload }: PayloadAction<INotificationList>) => {
    state.notificationList = payload.notificationList;
    state.onlyUnread = payload.onlyUnread;
  },
  [searchPostsByElasticRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPostsPayload>) => {
    state.posts = payload.posts;
  },
  [markNotificationReadRoutine.SUCCESS]: (state, { payload }: PayloadAction<string>) => {
    const notification = state.notificationList.find(item => item.id === payload);
    state.notificationCount += (notification.isRead ? 1 : -1);

    if (state.onlyUnread) {
      state.notificationList = state.notificationList.filter(item => item.id !== payload);
    } else {
      state.notificationList = state.notificationList.map(item => (item.id === payload
        ? { ...item, isRead: !notification.isRead } : item));
    }
  },
  [markAllNotificationsReadRoutine.SUCCESS]: state => {
    state.notificationCount = 0;
    if (state.onlyUnread) {
      state.notificationList = [];
    } else {
      state.notificationList = state.notificationList.map(item => ({ ...item, isRead: true }));
    }
  }
});
