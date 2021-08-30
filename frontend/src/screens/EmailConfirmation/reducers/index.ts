import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { emailConfirmationReducer } from '@screens/EmailConfirmation/containers/EmailConfirmationPage/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: emailConfirmationReducer
});

/* PlopJS request_extractor placeholder. Do not remove */
