/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createFeedPageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`FEED_PAGE:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchDataRoutine = createFeedPageRoutine('FETCH_DATA');