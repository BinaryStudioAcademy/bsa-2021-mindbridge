import { IPostsDates } from '@screens/CreatePost/models/IPostsDates';

export interface IUserProfile {
  id: string;
  fullName: string;
  avatar: string;
  postsQuantity: number;
  followersQuantity: number;
  rating: number;
  datesOfPosts: [IPostsDates];
}
