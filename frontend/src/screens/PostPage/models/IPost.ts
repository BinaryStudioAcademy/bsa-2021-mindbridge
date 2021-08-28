export interface IPost {
  id: string;
  authorId: string;
  text: string;
  title: string;
  markdown: boolean;
  coverImage: string;
  tags: [];
  draft: boolean;
}
