/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createPostVersionsRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`POST_VERSIONS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchPostTitleRoutine = createPostVersionsRoutine('FETCH_POST_TITLE');
