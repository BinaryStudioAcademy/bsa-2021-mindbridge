import { ITag } from '@root/screens/FeedPage/models/ITag';
import { IUser } from './IUser';

export interface IPostPR {
  closed: boolean;
  contributor: IUser;
  coverImage: string;
  createdAt: string;
  deleted: boolean;
  id: string;
  markdown: boolean;
  post: {
    author: IUser;
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
