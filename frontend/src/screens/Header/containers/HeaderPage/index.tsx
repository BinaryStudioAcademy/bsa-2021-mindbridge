import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect, useSelector } from 'react-redux';
import Logo from '@components/Logo/Logo';
import NotificationCount from '@components/NotificationCount';
import DarkButton from '@components/buttons/DarcButton';
import BellSvg from '@screens/Header/containers/HeaderPage/svg/bellSvg';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { INotification } from '@screens/Header/models/INotification';
import {
  fetchNotificationCountRoutine,
  fetchNotificationListRoutine,
  searchPostsByElasticRoutine
} from '@screens/Header/routines';
import { extractData } from '@screens/Header/reducers';
import { Link, NavLink, useHistory } from 'react-router-dom';
import NotificationList from '@components/NotificationList';
import SearchSvg from '@components/Header/svg/searchSvg';
import LogOutSvg from '@screens/Header/containers/HeaderPage/svg/logOutSvg';
import { handleOnClickSignOut } from '@helpers/signOut.helper';

export interface IHeaderProps extends IState, IActions {
  isAuthorized: boolean;
}

interface IState {
  notificationCount: any;
  notificationList?: INotification[];
}

interface IActions {
  fetchNotificationCount: IBindingCallback1<string>;
  fetchNotificationList: IBindingCallback1<string>;
  searchPostsByElastic: IBindingAction;
}

const Header: React.FC<IHeaderProps> = (
  { isAuthorized, notificationCount, notificationList, fetchNotificationCount, fetchNotificationList, searchPostsByElastic }
) => {
  const { currentUser } = useSelector((state: any) => ({
    currentUser: state.auth.auth.user
  }));
  const history = useHistory();
  const [elasticContent, setElasticContent] = useState(' ');
  useEffect(() => {
    if (currentUser?.id) {
      fetchNotificationCount(currentUser.id);
    }
  }, [currentUser]);
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleNotificationList = () => {
    fetchNotificationList(currentUser.id);
    setIsListOpen(!isListOpen);
  };

  const handleCreatePostButton = () => {
    if (isAuthorized) {
      history.push('/create/post');
      history.go();
    } else {
      history.push('/login');
      history.go();
    }
  };

  const handleInputContent = (event: any) => {
    setElasticContent(event.target.value);
  };

  const handleSendToElasticSearch = () => {
    searchPostsByElastic();
  };
  return (
    <div className={styles.header_container}>
      <div className={styles.left}>
        <Link to="/">
          <Logo width={99} height={44} />
        </Link>
        <div className={styles.header_menu}>
          <NavLink exact className={styles.navButton} activeClassName={styles.activeNavButton} to="/">
            Home
          </NavLink>
          <NavLink className={styles.navButton} activeClassName={styles.activeNavButton} to="/hots">
            Hot posts
          </NavLink>
          <NavLink className={styles.navButton} activeClassName={styles.activeNavButton} to="/bests">
            Best posts
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
          <input type="text" placeholder="Search..." onChange={handleInputContent} />
          <button type="button" onClick={handleSendToElasticSearch}>
            <SearchSvg />
          </button>
        </div>
        <DarkButton
          className={styles.create_post_button}
          onClick={() => handleCreatePostButton()}
          content="Create post"
        />
        {isAuthorized
          ? (
            <button className={styles.header_notification} type="button" onClick={handleOnClickSignOut}>
              <LogOutSvg />
            </button>
          )
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { auth } = state;
  return {
    isAuthorized: auth.auth.isAuthorized,
    notificationCount: extractData(state).notificationCount,
    notificationList: extractData(state).notificationList
  };
};

const mapDispatchToProps: IActions = {
  fetchNotificationCount: fetchNotificationCountRoutine,
  fetchNotificationList: fetchNotificationListRoutine,
  searchPostsByElastic: searchPostsByElasticRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
