/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createEmailSuccessConfirmationRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`EMAIL_SUCCESS_CONFIRMATION:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchUserRoutine = createEmailSuccessConfirmationRoutine('FETCH_USER');
