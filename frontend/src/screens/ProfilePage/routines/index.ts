/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const profilePageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`PROFILE_PAGE:${actionName}`);

export const sendFormRoutine = profilePageRoutine('SEND_FORM');
