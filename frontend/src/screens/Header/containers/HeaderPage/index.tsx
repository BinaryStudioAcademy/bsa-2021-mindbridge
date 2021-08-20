import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect, useSelector } from 'react-redux';
import Logo from '@components/Logo/Logo';
import NotificationCount from '@components/NotificationCount';
import DarkButton from '@components/buttons/DarcButton';
import BellSvg from '@screens/Header/containers/HeaderPage/svg/bellSvg';
import { IBindingCallback1 } from '@models/Callbacks';
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
import { IPost } from '@screens/Header/models/IPost';
import FoundPostsList from '@components/FoundPostsList';
import { useDebouncedCallback } from 'use-debounce';

export interface IHeaderProps extends IState, IActions {
  isAuthorized: boolean;
}

interface IState {
  notificationCount: any;
  notificationList?: INotification[];
  posts: IPost[];
}

interface IActions {
  fetchNotificationCount: IBindingCallback1<string>;
  fetchNotificationList: IBindingCallback1<string>;
  searchPostsByElastic: IBindingCallback1<string>;
}

const Header: React.FC<IHeaderProps> = (
  { isAuthorized, notificationCount, notificationList, fetchNotificationCount,
    fetchNotificationList, searchPostsByElastic, posts }
) => {
  const { currentUser } = useSelector((state: any) => ({
    currentUser: state.auth.auth.user
  }));
  const history = useHistory();
  const [elasticContent, setElasticContent] = useState('');
  useEffect(() => {
    if (currentUser?.id) {
      fetchNotificationCount(currentUser.id);
    }
  }, [currentUser]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSearchInputFilled, setIsSearchInputFilled] = useState(false);
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

  const handleLinkClick = () => {
    setIsSearchInputFilled(false);
    searchPostsByElastic('');
    setElasticContent('');
  };

  const debounced = useDebouncedCallback(value => {
    searchPostsByElastic(value);
  }, 400);

  const handleInputContent = (event: any) => {
    debounced(event.target.value);
    setElasticContent(event.target.value);
    if (event.target.value) {
      setIsSearchInputFilled(true);
    } else {
      setIsSearchInputFilled(false);
    }
  };

  const handleBlur = (event: any) => {
    if (!event.relatedTarget) {
      setIsSearchInputFilled(false);
    }
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
        <div className={styles.search_input} onBlur={handleBlur}>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleInputContent}
            value={elasticContent}
          />
          {isSearchInputFilled
          && <button type="button" className={styles.close_image} onClick={handleLinkClick}>✖</button>}
          <button type="button">
            <SearchSvg />
          </button>
          {isSearchInputFilled
            && (
            <div className={styles.foundPosts}>
              <ul>
                {posts[0]
                && posts.map(post => (
                  <FoundPostsList
                    linkClick={handleLinkClick}
                    key={post.sourceId}
                    post={post}
                  />
                ))}
              </ul>
            </div>
            )}
        </div>
        <DarkButton
          className={styles.create_post_button}
          onClick={() => handleCreatePostButton()}
          content="Create post"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { auth } = state;
  return {
    isAuthorized: auth.auth.isAuthorized,
    notificationCount: extractData(state).notificationCount,
    notificationList: extractData(state).notificationList,
    posts: extractData(state).posts
  };
};

const mapDispatchToProps: IActions = {
  fetchNotificationCount: fetchNotificationCountRoutine,
  fetchNotificationList: fetchNotificationListRoutine,
  searchPostsByElastic: searchPostsByElasticRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
