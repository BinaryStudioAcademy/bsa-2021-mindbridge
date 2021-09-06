import { IPostTitle } from '@screens/ProfilePage/models/IPostTitle';
import { IFollower } from '@screens/ProfilePage/models/IFollower';

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
  followers: IFollower[];
  following: IFollower[];
  followersQuantity: number;
  followingQuantity: number;
  lastArticleTitles: IPostTitle[];
  createdAt: string;
}
