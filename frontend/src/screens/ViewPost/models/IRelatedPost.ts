import { IUser } from '@screens/ViewPost/models/IUser';

export interface IRelatedPost {
  id: string;
  title: string;
  coverImage: string;
  author: IUser;
  text: string;
  rating: number;
  createdAt: string;
  postRating: number;
  avatar: string;
}
