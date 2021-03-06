/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const profilePageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`PROFILE_PAGE:${actionName}`);

export const sendFormRoutine = profilePageRoutine('SEND_FORM');
export const fetchUserRoutine = profilePageRoutine('FETCH_USER');
export const sendChangePasswordFormRoutine = profilePageRoutine('SEND_CHANGE_PASSWORD_FORM');
export const sendAvatarRoutine = profilePageRoutine('SEND_AVATAR');
export const deleteAvatarRoutine = profilePageRoutine('DELETE_AVATAR');
export const sendNicknameRoutine = profilePageRoutine('SEND_NICKNAME');
export const sendPasswordRoutine = profilePageRoutine('SEND_PASSWORD');
export const openPasswordChangeModalRoutine = profilePageRoutine('OPEN_PASSWORD_CHANGE_MODAL');
export const fetchAchievementsByUserRoutine = profilePageRoutine('FETCH_ACHIEVEMENTS_BY_USER');
export const toggleFollowUserRoutine = profilePageRoutine('TOGGLE_FOLLOW_USER');
export const unfollowUserFromModalRoutine = profilePageRoutine('UNFOLLOW_USER_FROM_MODAL');
