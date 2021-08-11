import React from 'react';
import styles from './styles.module.scss';

function NotificationCount({ notificationCount }) {
  return (
    <div className={notificationCount ? styles.notification_count : styles.invisible}>
      {notificationCount}
    </div>
  );
}

export default NotificationCount;
