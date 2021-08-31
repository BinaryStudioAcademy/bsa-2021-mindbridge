import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { IBindingCallback1 } from '@models/Callbacks';
import MarkButton from '@components/buttons/MarkButton';

export interface INotificationListItemProps {
  id: string;
  sourceId: string;
  type: string;
  text: string;
  createdAt: string;
  setIsListOpen: IBindingCallback1<boolean>;
  markNotificationRead: IBindingCallback1<string>;
  isRead: boolean;
}

const NotificationListItem: React.FC<INotificationListItemProps> = (
  {
    id,
    sourceId,
    type,
    text,
    createdAt,
    setIsListOpen,
    markNotificationRead,
    isRead
  }
) => {
  const [link, setLink] = useState('/');

  useEffect(() => {
    switch (type) {
      case 'newPR': {
        setLink(`/pullRequest/${sourceId}`);
        break;
      }
      case 'newPost': {
        setLink(`/post/${sourceId}`);
        break;
      }
      case 'newFollower': {
        setLink(`/user/${sourceId}`);
        break;
      }
      default: {
        break;
      }
    }
  }, [0]);

  const handleReadNotification = e => {
    markNotificationRead(id);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCloseList = () => {
    markNotificationRead(id);
    setIsListOpen(false);
  };

  return (
    <li>
      <Link
        to={link}
        className={styles.listItem}
        onClick={handleCloseList}
        onKeyDown={handleCloseList}
        role="link"
        tabIndex={0}
      >
        <div
          role="button"
          tabIndex={0}
          onKeyDown={e => handleReadNotification(e)}
          className={styles.closeBtn}
          onClick={e => handleReadNotification(e)}
        >
          <MarkButton inverted={!isRead} />
        </div>
        <div className={styles.upper}>
          <span className={styles.title}>{type}</span>
          <span className={styles.date}>{new Date(createdAt).toDateString()}</span>
        </div>
        <span className={styles.description}>{text}</span>
      </Link>
    </li>
  );
};

export default NotificationListItem;
