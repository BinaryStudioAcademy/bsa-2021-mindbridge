import { IUser } from '@screens/PullRequest/models/IUser';
import { ITag } from '@screens/FeedPage/models/ITag';

export interface IPostVersion {
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
