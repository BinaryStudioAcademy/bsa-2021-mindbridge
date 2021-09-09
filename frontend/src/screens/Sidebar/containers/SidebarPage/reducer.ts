import { createReducer } from '@reduxjs/toolkit';
import { ITag } from '@screens/FeedPage/models/ITag';
import { fetchPopularTagsRoutine } from '@screens/Sidebar/routines';

export interface ISidebarReducerState {
  tags: ITag[];
  isTagsLoaded: boolean;
}

const initialState: ISidebarReducerState = {
  tags: [],
  isTagsLoaded: true
};

export const sidebarReducer = createReducer(initialState, {
  [fetchPopularTagsRoutine.TRIGGER]: state => {
    state.isTagsLoaded = false;
  },
  [fetchPopularTagsRoutine.SUCCESS]: (state, action) => {
    state.tags = action.payload;
    state.isTagsLoaded = true;
  },
  [fetchPopularTagsRoutine.FAILURE]: state => {
    state.isTagsLoaded = true;
  }
});
