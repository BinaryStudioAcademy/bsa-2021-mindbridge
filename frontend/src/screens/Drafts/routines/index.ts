/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createDraftsRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`DRAFTS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchDraftsRoutine = createDraftsRoutine('FETCH_DRAFTS');
