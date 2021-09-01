/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createHeaderRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`HEADER:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchNotificationCountRoutine = createHeaderRoutine('FETCH_NOTIFICATION_COUNT');

export const fetchNotificationListRoutine = createHeaderRoutine('FETCH_NOTIFICATION_LIST');

export const searchPostsByElasticRoutine = createHeaderRoutine('SEARCH_POSTS_BY_ELASTIC_ROUTINE');

export const markNotificationReadRoutine = createHeaderRoutine('MARK_NOTIFICATION_READ');

export const markAllNotificationsReadRoutine = createHeaderRoutine('MARK_ALL_NOTIFICATIONS_READ');

export const fetchMoreNotificationsRoutine = createHeaderRoutine('FETCH_MORE_NOTIFICATIONS');
