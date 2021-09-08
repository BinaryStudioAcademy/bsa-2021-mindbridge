import { ICurrentUser } from '@screens/Login/models/ICurrentUser';

export interface IDataAuth {
  isAuthorized: boolean;
  user: ICurrentUser;
  userIp: string;
}
