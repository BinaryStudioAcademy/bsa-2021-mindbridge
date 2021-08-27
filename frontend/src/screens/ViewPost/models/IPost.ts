import { ITag } from '@screens/ViewPost/models/ITag';
import { IUser } from '@screens/ViewPost/models/IUser';
import { IComment } from '@screens/ViewPost/models/IComment';

export interface IPost {
  id: string;
  title: string;
  coverImage: string;
  text: string;
  commentsCount: number;
  author: IUser;
  rating: number;
  tags: ITag [];
  createdAt: string;
  postRating: number;
  avatar: string;
  markdown: boolean;
  comments: IComment[];
  draft: boolean;
}
