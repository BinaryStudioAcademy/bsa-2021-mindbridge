/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPullRequestRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`PULL_REQUEST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const acceptPrRoutine = createPullRequestRoutine('ACCEPT_PR');
export const resetFailSendingDataRoutine = createPullRequestRoutine('RESET_FAIL_SENDING_DATA');
export const closePrRoutine = createPullRequestRoutine('CLOSE_PR');
export const fetchPrRoutine = createPullRequestRoutine('FETCH_PR');
