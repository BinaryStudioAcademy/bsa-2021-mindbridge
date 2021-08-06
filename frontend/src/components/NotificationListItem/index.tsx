import React from 'react';
import { INotification } from '@screens/Header/models/INotification';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

export interface INotificationListItemProps {
  sourceId: string;
  type: string;
  text: string;
  createdAt: string;
}

const NotificationListItem: React.FC<INotificationListItemProps> = ({ sourceId, type, createdAt, text }) => (
  <li className={styles.listItem}>
    <span>{type}</span>
    <span>{text}</span>
    <span><Link to={`/post/${sourceId}`}>Follow to notification</Link></span>
  </li>
);

export default NotificationListItem;
