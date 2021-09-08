/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createPostVersionsRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`POST_VERSIONS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchPrsOfMyPostsRoutine = createPostVersionsRoutine('FETCH_PRS_OF_MY_POSTS');
export const fetchPostTitleRoutine = createPostVersionsRoutine('FETCH_POST_TITLE');
export const fetchPostContributionsRoutine = createPostVersionsRoutine('FETCH_POST_CONTRIBUTIONS');
export const fetchOpenPostContributionsRoutine = createPostVersionsRoutine('FETCH_OPEN_POST_CONTRIBUTIONS');
