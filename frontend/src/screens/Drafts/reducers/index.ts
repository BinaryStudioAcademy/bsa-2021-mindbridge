import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { draftsReducer } from '@screens/Drafts/containers/DraftsPage/reducer';
import { fetchDraftsRoutine } from '@screens/Drafts/routines';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchDraftsRequest: reducerCreator([fetchDraftsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: draftsReducer
});

const reqs = (state: RootState) => state.draftsReducer.requests;
const data = (state: RootState) => state.draftsReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
