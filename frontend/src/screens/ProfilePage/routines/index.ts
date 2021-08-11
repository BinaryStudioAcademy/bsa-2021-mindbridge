/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createProfilePageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`PROFILE_PAGE:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchDataRoutine = createProfilePageRoutine('FETCH_DATA');
