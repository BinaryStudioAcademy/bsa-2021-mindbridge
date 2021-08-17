import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '@screens/Header/models/INotification';
import {
  fetchNotificationCountRoutine,
  fetchNotificationListRoutine, searchButtonClickedRoutine,
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
  isSearchBtnClicked: boolean;
}

const initialState: IHeaderReducerState = {
  notificationCount: 0,
  notificationList: [],
  posts: [],
  isSearchBtnClicked: false

};

export const headerReducer = createReducer(initialState, {
  [fetchNotificationCountRoutine.SUCCESS]: (state, { payload }: PayloadAction<INotificationCount>) => {
    state.notificationCount = payload.notificationCount;
  },
  [fetchNotificationListRoutine.SUCCESS]: (state, { payload }: PayloadAction<INotificationList>) => {
    state.notificationList = payload.notificationList;
  },
  [searchPostsByElasticRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPostsPayload>) => {
    state.posts = payload.posts;
  },
  [searchButtonClickedRoutine.TRIGGER]: state => {
    state.isSearchBtnClicked = !state.isSearchBtnClicked;
  }
});
