import { IUserReactions } from '@screens/CreatePost/models/IUserReactions';

export interface IUserProfile {
  id: string;
  fullName: string;
  nickname: string;
  avatar: string;
  postsQuantity: number;
  followersQuantity: number;
  rating: number;
  userReactions: IUserReactions[];
}
