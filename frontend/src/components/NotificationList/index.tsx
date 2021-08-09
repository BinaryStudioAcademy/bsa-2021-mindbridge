import React from 'react';
import { INotification } from '@screens/Header/models/INotification';
import NotificationListItem from '@components/NotificationListItem';

import styles from './style.module.scss';

export interface INotificationListProps {
  list: INotification[];
}

const NotificationList: React.FC<INotificationListProps> = ({ list }) => (
  <ul className={styles.list}>
    {list && list?.length !== 0 ? (
      list.map(item => (
        <NotificationListItem
          sourceId={item.sourceId}
          type={item.type}
          text={item.text}
          createdAt={item.createdAt}
          key={item.id}
        />
      ))) : (
        <p>Notification list is empty</p>
    )}
  </ul>
);

export default NotificationList;
