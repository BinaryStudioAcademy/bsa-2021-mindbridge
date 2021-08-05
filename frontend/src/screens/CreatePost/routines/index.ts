/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createCreatePostRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`CREATE_POST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const sendImageRoutine = createCreatePostRoutine('SEND_IMAGE');
