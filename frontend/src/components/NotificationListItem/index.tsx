import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import MarkButton from '@components/buttons/MarkButton';

export interface INotificationListItemProps {
  id: string;
  sourceId: string;
  type: string;
  text: string;
  createdAt: string;
  setIsListOpen: IBindingAction;
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
  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (type) {
      case 'newPR': {
        setLink(`/pullRequest/${sourceId}`);
        setTitle('New Contribution');
        break;
      }
      case 'newPost': {
        setLink(`/post/${sourceId}`);
        setTitle('New Post');
        break;
      }
      case 'newFollower': {
        setLink(`/user/${sourceId}`);
        setTitle('New Follower');
        break;
      }
      case 'newAchievement': {
        setLink(`/user/${sourceId}`);
        setTitle('Achievement Unlocked');
        break;
      }
      case 'PRClosed': {
        setLink(`/pullRequest/${sourceId}`);
        setTitle('Pull Request Closed');
        break;
      }
      case 'PRAccepted': {
        setLink(`/pullRequest/${sourceId}`);
        setTitle('Pull Request Accepted');
        break;
      }
      case 'newComment': {
        setLink(`/post/${sourceId}`);
        setTitle('New Comment');
        break;
      }
      case 'newReply': {
        setLink(`/post/${sourceId}`);
        setTitle('New Reply');
        break;
      }
      case 'newMention': {
        setLink(`/post/${sourceId}`);
        setTitle('You Were Mentioned');
        break;
      }
      case 'newPRComment': {
        setLink(`/pullRequest/${sourceId}`);
        setTitle('New comment');
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
    if (!isRead) {
      markNotificationRead(id);
    }
    setIsListOpen();
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
          <span className={styles.title}>{title}</span>
          <span className={styles.date}>{new Date(createdAt).toDateString()}</span>
        </div>
        <span className={styles.description}>{text}</span>
      </Link>
    </li>
  );
};

export default NotificationListItem;
