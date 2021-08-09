import { IPostVersions } from '@screens/CreatePost/models/IPostVersions';

export interface IUserProfile {
  id: string;
  fullName: string;
  avatar: string;
  postsQuantity: number;
  followersQuantity: number;
  rating: number;
}
