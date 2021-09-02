import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { favouritesPageReducer } from '@screens/FavouritesPage/containers/FavouritesPagePage/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: favouritesPageReducer
});

const reqs = (state: RootState) => state.favouritesPageReducer.requests;
const data = (state: RootState) => state.favouritesPageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
