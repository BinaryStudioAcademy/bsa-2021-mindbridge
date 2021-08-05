import { ITag } from '@screens/ViewPost/models/ITag';

export interface IPost {
  id: string;
  createdAt: string;
  title: string;
  text: string;
  authorName: string;
  tags: ITag[];
  postRating: number;
}
