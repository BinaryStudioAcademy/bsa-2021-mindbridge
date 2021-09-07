import { ICommentAuthor } from '@screens/ViewPost/models/ICommentAuthor';

export interface IComments {
  id: string;
  createdAt: string;
  text: string;
  author: ICommentAuthor;
  comments: IComments[];
  rating: number;
}
