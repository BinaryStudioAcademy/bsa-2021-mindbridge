import { IAuthState } from '@screens/Login/models/IAuthState';

export interface IAppState {
  toastr: any;
  auth: IAuthState;
}
