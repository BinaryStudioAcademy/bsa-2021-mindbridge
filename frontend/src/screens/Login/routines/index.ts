/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createLoginRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`LOGIN:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
