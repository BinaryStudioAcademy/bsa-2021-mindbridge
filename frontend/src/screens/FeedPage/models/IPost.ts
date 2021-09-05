import { ITag } from '@screens/FeedPage/models/ITag';
import { IFeedAuthor } from '@screens/FeedPage/models/IFeedAuthor';

export interface IPost {
  id: string;
  title: string;
  text: string;
  author: IFeedAuthor;
  commentsCount: number;
  likesCount: number;
  disLikesCount: number;
  tags: ITag[];
  createdAt: string;
  postRating: number;
  avatar: string;
  coverImage: string;
  markdown: boolean;
}

