/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createSidebarRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`SIDEBAR:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
