import { ITag } from '@screens/ViewPost/models/ITag';
import { IUser } from '@screens/ViewPost/models/IUser';

export interface IPost {
  id: string;
  createdAt: string;
  title: string;
  coverImage: string;
  text: string;
  author: IUser;
  tags: ITag[];
  rating: number;
}
