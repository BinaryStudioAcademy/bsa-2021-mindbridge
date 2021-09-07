/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPullRequestRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`PULL_REQUEST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchMyPullRequestsRoutine = createPullRequestRoutine('FETCH_MY_PULL_REQUESTS');
export const editPrRoutine = createPullRequestRoutine('EDIT_PR');
export const acceptPrRoutine = createPullRequestRoutine('ACCEPT_PR');
export const resetEndSendingDataRoutine = createPullRequestRoutine('RESET_FAIL_SENDING_DATA');
export const closePrRoutine = createPullRequestRoutine('CLOSE_PR');
export const fetchPrRoutine = createPullRequestRoutine('FETCH_PR');
export const sendCommentPrRoutine = createPullRequestRoutine('SEND_COMMENT_PR');
export const editPrCommentRoutine = createPullRequestRoutine('EDIT_PR_COMMENT');
