/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createDefaultRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`DEFAULT:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchDataRoutine = createDefaultRoutine('FETCH_DATA');
