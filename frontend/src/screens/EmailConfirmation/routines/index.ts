/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createEmailConfirmationRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`EMAIL_CONFIRMATION:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
