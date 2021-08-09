/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createCreatePostRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`CREATE_POST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const changeHtmlMarkdownModeRoutine = createCreatePostRoutine('CHANGE_HTML_MARKDOWN_MODE');
export const changeEditViewModeRoutine = createCreatePostRoutine('CHANGE_EDIT_VIEW_MODE');
export const fetchDataRoutine = createCreatePostRoutine('FETCH_DATA');
export const getPostVersionsRoutine = createCreatePostRoutine('GET_POST_VERSIONS');
