/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createFeedPageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`FEED_PAGE:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchAllUsersNumberRoutine = createFeedPageRoutine('FETCH_ALL_USERS_NUMBER');
export const fetchDataRoutine = createFeedPageRoutine('FETCH_DATA');
export const resetDataRoutine = createFeedPageRoutine('RESET_DATA');
export const addMorePostsRoutine = createFeedPageRoutine('ADD_MORE_POSTS');
export const likePostRoutine = createFeedPageRoutine('LIKE_POST_ROUTINE');
export const disLikePostRoutine = createFeedPageRoutine('DISLIKE_POST_ROUTINE');
export const searchPostsRoutine = createFeedPageRoutine('SEARCH_POSTS');
export const loadCountResultsRoutine = createFeedPageRoutine('LOAD_COUNT_RESULTS');
