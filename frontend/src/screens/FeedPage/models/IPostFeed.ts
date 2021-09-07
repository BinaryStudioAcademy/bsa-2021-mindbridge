import { ITag } from '@screens/FeedPage/models/ITag';

export interface IPostFeed {
  id: string;
  title: string;
  text: string;
  authorId: string;
  authorName: string;
  nickname: string;
  commentsCount: number;
  likesCount: number;
  disLikesCount: number;
  tags: ITag[];
  createdAt: string;
  postRating: number;
  avatar: string;
  coverImage: string;
  markdown: boolean;
  reacted: boolean;
  isLiked: boolean;
  isFavourite: boolean;
  postViewsNumber: number;
}

