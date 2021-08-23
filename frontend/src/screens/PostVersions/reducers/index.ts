import { combineReducers } from 'redux';
import { postVersionsReducer } from '@screens/PostVersions/containers/PostVersionsPage/reducer';
import { reducerCreator } from '@helpers/reducer.helper';
import { fetchPostContributionsRoutine, fetchPostTitleRoutine } from '@screens/PostVersions/routines';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchPostTitleRequest: reducerCreator([fetchPostTitleRoutine.TRIGGER]),
  fetchPostContributionsRequest: reducerCreator([fetchPostContributionsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: postVersionsReducer
});

/* PlopJS request_extractor placeholder. Do not remove */
