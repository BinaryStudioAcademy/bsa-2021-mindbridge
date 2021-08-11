import { IDataAuth } from '@screens/Login/models/IDataAuth';
import { IRequestState } from '@models/IRequestState';

export interface IAuthState {
  requests: {
    loginRequest: IRequestState;
    registerRequest: IRequestState;
  };
  auth: IDataAuth;
}
