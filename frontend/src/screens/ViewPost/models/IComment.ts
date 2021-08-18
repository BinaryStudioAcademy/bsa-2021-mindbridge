import { IUser } from '@screens/ViewPost/models/IUser';

export interface IComment {
  id: string;
  createdAt: string;
  text: string;
  author: IUser;
  comments: IComment[];
  rating: number;
}
