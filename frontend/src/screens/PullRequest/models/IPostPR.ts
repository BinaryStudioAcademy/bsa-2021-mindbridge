import { ITag } from '@root/screens/FeedPage/models/ITag';
import { IUser } from './IUser';

export enum PrState {
  closed = 'closed',
  open = 'open',
  accepted = 'accepted'
}

export interface IPostPR {
  state: PrState;
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
