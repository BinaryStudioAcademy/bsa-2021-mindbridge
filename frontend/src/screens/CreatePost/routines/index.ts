/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createCreatePostRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`CREATE_POST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchTagsRoutine = createCreatePostRoutine('FETCH_TAGS');
export const resetLoadingImageRoutine = createCreatePostRoutine('RESET_LOADING_IMAGE');
export const sendPostRoutine = createCreatePostRoutine('SEND_POST');
export const sendImageRoutine = createCreatePostRoutine('SEND_IMAGE');
export const fetchUserProfileRoutine = createCreatePostRoutine('FETCH_USER_PROFILE');
export const getPostVersionsRoutine = createCreatePostRoutine('GET_POST_VERSIONS');
