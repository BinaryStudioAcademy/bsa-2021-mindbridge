import { combineReducers } from 'redux';
import { sidebarReducer } from '@screens/Sidebar/containers/SidebarPage/reducer';
import { reducerCreator } from '@helpers/reducer.helper';
import { fetchPopularTagsRoutine } from '@screens/Sidebar/routines';
import { RootState } from '@root/store';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchPopularTagsRequest: reducerCreator([fetchPopularTagsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: sidebarReducer
});

/* PlopJS request_extractor placeholder. Do not remove */
