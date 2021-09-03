import { ITag } from '@screens/ViewPost/models/ITag';
import { IUser } from '@screens/ViewPost/models/IUser';
import { IRelatedPost } from '@screens/ViewPost/models/IRelatedPost';
import { IComments } from '@screens/ViewPost/models/IComments';

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
  draft: boolean;
  relatedPosts: IRelatedPost[];
  comments: IComments[];
}
