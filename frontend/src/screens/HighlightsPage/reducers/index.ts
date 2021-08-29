import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { highlightsReducer } from '@screens/HighlightsPage/containers/HighlightsPage/reducer';
import { fetchHighlightsRoutine, deleteHighlightRoutine } from '@screens/HighlightsPage/routines';

/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchHighlightsRequest: reducerCreator([fetchHighlightsRoutine.TRIGGER]),
  deleteHighlightRequest: reducerCreator([deleteHighlightRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: highlightsReducer
});

const reqs = (state: RootState) => state.highlightsReducer.requests;
const data = (state: RootState) => state.highlightsReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
