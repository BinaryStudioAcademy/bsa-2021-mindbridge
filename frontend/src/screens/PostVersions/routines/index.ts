/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPostVersionsRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`POST_VERSIONS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const getPostVersionsRoutine = createPostVersionsRoutine('GET_POST_VERSIONS');
