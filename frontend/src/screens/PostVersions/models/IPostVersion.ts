export interface IPostVersion {
  id: string;
  createdAt: string;
  author: {
    id: string;
    nickname: string;
    avatar: string;
  };
}
