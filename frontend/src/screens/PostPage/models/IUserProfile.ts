import { IUserReactions } from '@screens/PostPage/models/IUserReactions';

export interface IUserProfile {
  id: string;
  fullName: string;
  nickname: string;
  avatar: string;
  postsQuantity: number;
  followersQuantity: number;
  rating: number;
  emailVerified: boolean;
  userReactions: IUserReactions[];
}
