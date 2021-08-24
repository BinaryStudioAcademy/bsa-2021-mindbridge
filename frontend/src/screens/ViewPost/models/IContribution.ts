import { PrState } from '@root/screens/PullRequest/models/IPostPR';
import { IUser } from '@screens/ViewPost/models/IUser';

export interface IContribution {
  id: string;
  author: IUser;
  createdAt: string;
  state: PrState;
}
