/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const postPageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`CREATE_POST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const resetImageTagRoutine = postPageRoutine('RESET_IMAGE_TAG');
export const fetchTagsRoutine = postPageRoutine('FETCH_TAGS');
export const resetLoadingImageRoutine = postPageRoutine('RESET_LOADING_IMAGE');
export const sendPostRoutine = postPageRoutine('SEND_POST');
export const sendImageRoutine = postPageRoutine('SEND_IMAGE');
export const fetchUserProfileRoutine = postPageRoutine('FETCH_USER_PROFILE');
export const fetchPostRoutine = postPageRoutine('FETCH_POST');
export const sendPRRoutine = postPageRoutine('SEND_PR');
export const getPostVersionsRoutine = postPageRoutine('GET_POST_VERSIONS');
export const editPostRoutine = postPageRoutine('EDIT_POST');
export const setLoaderRoutine = postPageRoutine('SET_LOADER');
