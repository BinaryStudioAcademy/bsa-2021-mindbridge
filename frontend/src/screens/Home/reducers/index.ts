import { combineReducers } from 'redux';
import { fetchDataRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/Data/reducer';

const requests = combineReducers({
  // as you add more fields, please update screens\Home\models\IDataState.ts
  dataRequest: reducerCreator([fetchDataRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});
