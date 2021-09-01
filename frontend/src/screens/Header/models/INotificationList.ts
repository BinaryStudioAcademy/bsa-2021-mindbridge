import { INotification } from '@screens/Header/models/INotification';

export interface INotificationList {
  notificationList: INotification[];
  onlyUnread: boolean;
}
