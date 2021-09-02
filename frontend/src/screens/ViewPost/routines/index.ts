/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createViewPostRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`VIEW_POST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchDataRoutine = createViewPostRoutine('FETCH_DATA');
export const fetchRelatedPostsRoutine = createViewPostRoutine('FETCH_RELATED_POSTS');
export const leaveReactionOnPostViewPageRoutine = createViewPostRoutine('LEAVE_REACTION_ON_POST_VIEW_PAGE_ROUTINE');
export const sendCommentRoutine = createViewPostRoutine('SEND_COMMENT_ROUTINE');
export const sendReplyRoutine = createViewPostRoutine('SEND_REPLY_ROUTINE');
export const leaveReactionOnCommentRoutine = createViewPostRoutine('LEAVE_REACTION_ROUTINE');

export const searchUserByNicknameRoutine = createViewPostRoutine('SEARCH_USER');
