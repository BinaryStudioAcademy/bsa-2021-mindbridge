import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import Logo from '@components/Logo/Logo';
import BlueButton from '@components/buttons/Blue_button';
import ColorlessButton from '@components/buttons/ColorlessButton';
import NotificationCount from '@components/NotificationCount';
import DarkButton from '@components/buttons/DarcButton';
import BellSvg from '@screens/Header/containers/HeaderPage/svg/bellSvg';
import { IBindingAction } from '@models/Callbacks';
import { INotification } from '@screens/Header/models/INotification';
import { fetchNotificationCountRoutine, fetchNotificationListRoutine } from '@screens/Header/routines';
import { extractData } from '@screens/Header/reducers';
import { NavLink, Link } from 'react-router-dom';
import NotificationList from '@components/NotificationList';
import SearchSvg from '@components/Header/svg/searchSvg';

export interface IHeaderProps extends IState, IActions {
}

interface IState {
  notificationCount: any;
  notificationList?: INotification[];
}

interface IActions {
  fetchNotificationCount: IBindingAction;
  fetchNotificationList: IBindingAction;
}

const Header: React.FC<IHeaderProps> = (
  { notificationCount, notificationList, fetchNotificationCount, fetchNotificationList }
) => {
  useEffect(() => {
    fetchNotificationCount();
  }, [fetchNotificationCount]);
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleNotificationList = () => {
    fetchNotificationList();
    setIsListOpen(!isListOpen);
  };
  return (
    <div className={styles.header_container}>
      <div className={styles.left}>
        <NavLink to="/">
          <Logo width={99} height={44} />
        </NavLink>
        <div className={styles.header_menu}>
          <NavLink to="/">
            <BlueButton content="Home" />
          </NavLink>
          <NavLink to="/hots">
            <ColorlessButton content="Hot posts" />
          </NavLink>
          <NavLink to="bests">
            <ColorlessButton content="Best posts" />
          </NavLink>
        </div>
      </div>
      <div className={styles.right}>
        {isListOpen ? <NotificationList list={notificationList} /> : ''}
        <button className={styles.header_notification} type="button" onClick={toggleNotificationList}>
          <BellSvg />
          <NotificationCount notificationCount={notificationCount} />
        </button>
        <div className={styles.search_input}>
          <input type="text" placeholder="Search..." />
          <button type="button">
            <SearchSvg />
          </button>
        </div>
        <Link to="/create/post">
          <DarkButton className={styles.create_post_button} content="Create post" />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  notificationCount: extractData(state).notificationCount,
  notificationList: extractData(state).notificationList
});

const mapDispatchToProps: IActions = {
  fetchNotificationCount: fetchNotificationCountRoutine,
  fetchNotificationList: fetchNotificationListRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
