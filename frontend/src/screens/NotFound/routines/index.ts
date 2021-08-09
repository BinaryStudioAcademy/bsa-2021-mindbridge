/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPageNotFoundRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`PAGE_NOT_FOUND:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
