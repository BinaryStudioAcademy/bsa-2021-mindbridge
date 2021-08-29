import React, { useEffect, useRef } from 'react';
import { INotification } from '@screens/Header/models/INotification';
import NotificationListItem from '@components/NotificationListItem';

import styles from './style.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';

export interface INotificationListProps {
  list: INotification[];
  setIsListOpen: IBindingCallback1<boolean>;
  markNotificationRead: IBindingCallback1<string>;
  bellRef: any;
}

const NotificationList: React.FC<INotificationListProps> = ({ list, bellRef, setIsListOpen, markNotificationRead }) => {
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
    <ul className={styles.list} ref={wrapperRef}>
      {list && list?.length !== 0 ? (
        list.map(item => (
          <NotificationListItem
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
          <p>Notification list is empty</p>
      )}
    </ul>
  );
};

export default NotificationList;
