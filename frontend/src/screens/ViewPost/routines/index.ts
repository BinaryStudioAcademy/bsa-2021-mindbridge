/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createViewPostRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`VIEW_POST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchDataRoutine = createViewPostRoutine('FETCH_DATA');
export const leaveReactionOnPostViewPageRoutine = createViewPostRoutine('LEAVE_REACTION_ON_POST_VIEW_PAGE_ROUTINE');

