import { combineReducers } from 'redux';
import { sidebarReducer } from '@screens/Sidebar/containers/SidebarPage/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: sidebarReducer
});

// const reqs = (state: RootState) => state.sidebar.requests;
// const data = (state: RootState) => state.sidebar.data;

/* PlopJS request_extractor placeholder. Do not remove */
