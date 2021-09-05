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
  followers: [{ id: string; nickname: string; avatar: string; followerId: string }];
  following: [{ id: string; nickname: string; avatar: string; followerId: string }];
  followersQuantity: number;
  followingQuantity: number;
  lastArticleTitles: IPostTitle[];
  createdAt: string;
}
