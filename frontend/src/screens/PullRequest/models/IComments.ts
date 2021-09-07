import { IUser } from '@screens/PullRequest/models/IUser';

export interface IComments {
  id: string;
  createdAt: string;
  text: string;
  author: IUser;
  avatar: string;

}
