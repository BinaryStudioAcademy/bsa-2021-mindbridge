import { IUser } from '@screens/ViewPost/models/IUser';

export interface IContribution {
  id: string;
  author: IUser;
  createdAt: string;
}
