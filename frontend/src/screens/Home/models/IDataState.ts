import { IData } from './IData';
import { IRequestState } from '@models/IRequestState';

export interface IDataState {
  requests: {
    dataRequest: IRequestState;
  };
  data: IData;
}
