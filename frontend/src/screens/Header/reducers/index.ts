import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { headerReducer } from '@screens/Header/containers/HeaderPage/reducer';
import { reducerCreator } from '@helpers/reducer.helper';
import { searchButtonClickedRoutine, searchPostsByElasticRoutine } from '@screens/Header/routines';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  searchPostsByElasticRequest: reducerCreator([searchPostsByElasticRoutine.TRIGGER]),
  searchButtonClickedRequest: reducerCreator([searchButtonClickedRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: headerReducer
});

const data = (state: RootState) => state.headerReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractData = state => data(state);
