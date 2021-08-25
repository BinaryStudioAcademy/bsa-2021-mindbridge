import { IUser } from '@screens/PullRequest/models/IUser';
import { ITag } from '@screens/FeedPage/models/ITag';

export interface IPostVersion {
  coverImage: string;
  createdAt: string;
  deleted: boolean;
  id: string;
  markdown: boolean;
  preVersion: {
    coverImage: string;
    id: string;
    markdown: boolean;
    text: string;
    title: string;
    tags: ITag [];
  };
  author: IUser;
  text: string;
  title: string;
  updatedAt: string;
  tags: ITag [];
}
