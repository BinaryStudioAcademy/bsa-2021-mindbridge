import { ITag } from "./ITag";

export interface IPost {
  id: string;
  title: string;
  text: string;
  authorName: string;
  commentsCount: number;
  rating: number;
  tags: ITag [];
  createdAt: string;
  postRating: number;
  avatar: string;
  coverImage: string;
  markdown: boolean;
}