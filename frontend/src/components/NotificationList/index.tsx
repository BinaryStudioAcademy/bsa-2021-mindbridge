import React, { useEffect, useRef, useState } from 'react';
import { INotification } from '@screens/Header/models/INotification';
import NotificationListItem from '@components/NotificationListItem';

import styles from './style.module.scss';
import { IBindingAction, IBindingCallback1, IBindingCallback2 } from '@models/Callbacks';
import NoResultsSvg from '@components/svgs/NoResultsSvg';
import LoaderWrapper from '@components/LoaderWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface INotificationListProps {
  list: INotification[];
  setIsListOpen: IBindingCallback1<boolean>;
  markNotificationRead: IBindingCallback1<string>;
  bellRef: any;
  fetchNotifications: IBindingCallback2<boolean, object>;
  markAllNotificationsRead: IBindingAction;
  notificationsLoading: boolean;
}

const params = {
  from: 0,
  count: 5
};

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
    fetchNotifications(!onlyUnread, params);
    const { from, count } = params;
    params.from = from + count;
  };

  const toggleNotifications = () => {
    params.from = 0;
    const { from, count } = params;
    fetchNotifications(!onlyUnread, {from, count});
    params.from = from + count;
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
        <button type="button" onClick={toggleNotifications}>{onlyUnread ? 'Show all' : 'Show only unread'}</button>
        <button type="button" onClick={markAllNotificationsRead}>Mark all read</button>
      </div>
      <ul className={styles.list}>
        {notificationsLoading ? (
          <div className={styles.loaderWrapper}>
            <LoaderWrapper loading={notificationsLoading} />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={list.length}
            next={handleFetchNotifications}
            hasMore
            loader={' '}
          >
            {list && list?.length !== 0 ? (
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
            )}
          </InfiniteScroll>
        )}
      </ul>
    </div>
  );
};

export default NotificationList;
