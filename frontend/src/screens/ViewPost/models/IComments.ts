import { IUser } from '@screens/ViewPost/models/IUser';

export interface IComments {
  id: string;
  createdAt: string;
  text: string;
  author: IUser;
  comments: IComments[];
  rating: number;
}
