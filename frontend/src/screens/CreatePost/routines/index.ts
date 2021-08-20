/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createCreatePostRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`CREATE_POST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const resetImageTagRoutine = createCreatePostRoutine('RESET_IMAGE_TAG');
export const fetchTagsRoutine = createCreatePostRoutine('FETCH_TAGS');
export const resetLoadingImageRoutine = createCreatePostRoutine('RESET_LOADING_IMAGE');
export const sendPostRoutine = createCreatePostRoutine('SEND_POST');
export const sendImageRoutine = createCreatePostRoutine('SEND_IMAGE');
export const fetchUserProfileRoutine = createCreatePostRoutine('FETCH_USER_PROFILE');
export const fetchPostRoutine = createCreatePostRoutine('FETCH_POST');
export const sendPRRoutine = createCreatePostRoutine('SEND_PR');
export const getPostVersionsRoutine = createCreatePostRoutine('GET_POST_VERSIONS');
export const editPostRoutine = createCreatePostRoutine('EDIT_POST');
export const likePostViewRoutine = createCreatePostRoutine('LIKE_POST_FRONT');
export const disLikePostViewRoutine = createCreatePostRoutine('DISLIKE_POST_FRONT_ROUTINE');
