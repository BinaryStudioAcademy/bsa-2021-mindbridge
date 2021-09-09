import { ITag } from '@screens/FeedPage/models/ITag';

export interface IDraft {
  id: string;
  title: string;
  tags: ITag[];
  createdAt: string;
  coverImage: string;
  draft: boolean;
}
