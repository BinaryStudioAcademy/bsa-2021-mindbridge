import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { emailSuccessConfirmationReducer }
  from '@screens/EmailSuccessConfirmation/containers/EmailSuccessConfirmationPage/reducer';
import { fetchUserRoutine } from '@screens/EmailSuccessConfirmation/routines';

/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchUserRequest: reducerCreator([fetchUserRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: emailSuccessConfirmationReducer
});

const reqs = (state: RootState) => state.emailSuccessConfirmationReducer.requests;
const data = (state: RootState) => state.emailSuccessConfirmationReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */

export const extractData = state => data(state);
