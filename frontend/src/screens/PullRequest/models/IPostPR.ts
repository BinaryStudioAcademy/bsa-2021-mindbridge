import { ITag } from '@root/screens/FeedPage/models/ITag';

export interface IPostPR {
  closed: boolean;
  contributor: {
    id: string;
    nickname: string;
    avatar: string;
    };
  coverImage: string;
  createdAt: string;
  deleted: boolean;
  id: string;
  markdown: boolean;
  post: {
    author: {
      id: string;
      nickname: string;
      avatar: string;
      };
    coverImage: string;
    id: string;
    markdown: boolean;
    text: string;
    title: string;
    tags: ITag [];
  };
  text: string;
  title: string;
  updatedAt: string;
  tags: ITag [];
}
