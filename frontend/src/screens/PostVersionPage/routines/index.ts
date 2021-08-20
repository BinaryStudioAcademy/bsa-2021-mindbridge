/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPostVersionPageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`POST_VERSION_PAGE:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchPostVersionRoutine = createPostVersionPageRoutine('FETCH_POST_VERSION_ROUTINE');
