/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createHighlightsRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`HIGHLIGHTS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchHighlightsRoutine = createHighlightsRoutine('FETCH_HIGHLIGHTS_ROUTINE');
export const deleteHighlightRoutine = createHighlightsRoutine('DELETE_HIGHLIGHT_ROUTINE');
