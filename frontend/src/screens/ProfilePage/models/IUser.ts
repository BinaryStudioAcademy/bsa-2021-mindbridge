import { IPostTitle } from '@screens/ProfilePage/models/IPostTitle';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  avatar: string;
  rating: number;
  commentsQuantity: number;
  postsQuantity: number;
  contributionsQuantity: number;
  followersQuantity: number;
  lastArticleTitles: IPostTitle[];
  createdAt: string;
}
