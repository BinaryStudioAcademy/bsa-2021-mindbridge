/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createViewPostRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`VIEW_POST:${actionName}`);

export const fetchDataRoutine = createViewPostRoutine('FETCH_DATA');
/* PlopJS routine placeholder. Do not remove */
