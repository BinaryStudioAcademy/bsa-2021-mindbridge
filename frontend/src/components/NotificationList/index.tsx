import React, { useEffect, useRef, useState } from 'react';
import { INotification } from '@screens/Header/models/INotification';
import NotificationListItem from '@components/NotificationListItem';

import styles from './style.module.scss';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import NoResultsSvg from '@components/svgs/NoResultsSvg';
import LoaderWrapper from "@components/LoaderWrapper";

export interface INotificationListProps {
  list: INotification[];
  setIsListOpen: IBindingCallback1<boolean>;
  markNotificationRead: IBindingCallback1<string>;
  bellRef: any;
  fetchNotifications: IBindingCallback1<boolean>;
  markAllNotificationsRead: IBindingAction;
  notificationsLoading: boolean;
}

const NotificationList: React.FC<INotificationListProps> = (
  { list,
    bellRef,
    setIsListOpen,
    markNotificationRead,
    fetchNotifications,
    markAllNotificationsRead,
    notificationsLoading
  }
) => {
  const [onlyUnread, setOnlyUnread] = useState(true);

  const handleFetchNotifications = () => {
    fetchNotifications(!onlyUnread);
    setOnlyUnread(!onlyUnread);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)
            && bellRef.current && !bellRef.current.contains(event.target)) {
          setIsListOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} className={styles.notificationWrapper}>
      <h4 className={styles.notificationTitle}>Notifications</h4>
      <div className={styles.filters}>
        <button type="button" onClick={handleFetchNotifications}>{onlyUnread ? 'Show all' : 'Show only unread'}</button>
        <button type="button" onClick={markAllNotificationsRead}>Mark all read</button>
      </div>
      <ul className={styles.list}>
        {notificationsLoading ? (
          <div className={styles.loaderWrapper}>
            <LoaderWrapper loading={notificationsLoading}/>
          </div>
        ) : (
          list && list?.length !== 0 ? (
            list.map(item => (
              <NotificationListItem
                isRead={item.isRead}
                markNotificationRead={markNotificationRead}
                id={item.id}
                sourceId={item.sourceId}
                type={item.type}
                text={item.text}
                createdAt={item.createdAt}
                setIsListOpen={setIsListOpen}
                key={item.id}
              />
            ))) : (
            <div className={styles.emptyResult}>
              <NoResultsSvg width="30%" height="30%" />
              <p>No notifications were found</p>
            </div>
          )
        )}
      </ul>
    </div>
  );
};

export default NotificationList;
