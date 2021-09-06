import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import Logo from '@components/Logo/Logo';
import NotificationCount from '@components/NotificationCount';
import DarkButton from '@components/buttons/DarcButton';
import BellSvg from '@screens/Header/containers/HeaderPage/svg/bellSvg';
import { IBindingCallback1 } from '@models/Callbacks';
import { INotification } from '@screens/Header/models/INotification';
import {
  fetchMoreNotificationsRoutine,
  fetchNotificationCountRoutine,
  fetchNotificationListRoutine, markAllNotificationsReadRoutine, markNotificationReadRoutine,
  searchPostsByElasticRoutine
} from '@screens/Header/routines';
import {
  extractData,
  extractFetchNotificationListLoading,
  extractMarkAllNotificationsReadLoading
} from '@screens/Header/reducers';
import { Link, NavLink, useHistory } from 'react-router-dom';
import NotificationList from '@components/NotificationList';
import SearchSvg from '@components/Header/svg/searchSvg';
import { IPost } from '@screens/Header/models/IPost';
import FoundPostsList from '@components/FoundPostsList';
import { useDebouncedCallback } from 'use-debounce';
import { toastr } from 'react-redux-toastr';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { stompClient } from '@helpers/stompClient.helper';

export interface IHeaderProps extends IState, IActions {
  isAuthorized: boolean;
}

interface IState {
  notificationCount: any;
  notificationList?: INotification[];
  posts: IPost[];
  currentUser: ICurrentUser;
  notificationsLoading: boolean;
}

interface IActions {
  fetchNotificationCount: IBindingCallback1<string>;
  fetchNotificationList: IBindingCallback1<object>;
  searchPostsByElastic: IBindingCallback1<string>;
  markNotificationRead: IBindingCallback1<string>;
  markAllNotificationsRead: IBindingCallback1<string>;
  fetchMoreNotifications: IBindingCallback1<object>;
}

const Header: React.FC<IHeaderProps> = (
  {
    isAuthorized,
    notificationCount,
    notificationList,
    fetchNotificationCount,
    fetchNotificationList,
    searchPostsByElastic,
    posts,
    currentUser,
    markNotificationRead,
    markAllNotificationsRead,
    notificationsLoading,
    fetchMoreNotifications
  }
) => {
  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }
    stompClient.connect('', '', () => {
      stompClient.subscribe(`/user/${currentUser.id}/newPR`, message => {
        toastr.info('New contribution', message.body);
        fetchNotificationCount(currentUser.id);
      });
      stompClient.subscribe(`/user/${currentUser.id}/newFollower`, message => {
        toastr.info('New follower', message.body);
        fetchNotificationCount(currentUser.id);
      });
      stompClient.subscribe(`/user/${currentUser.id}/newPost`, message => {
        toastr.info('New Post', message.body);
        fetchNotificationCount(currentUser.id);
      });
    }, warning => {
      toastr.warning('Warning', 'Internet connection is unstable');
      console.log(warning);
    }, warning => {
      toastr.warning('Warning', 'Internet connection is unstable');
      console.log(warning);
      switch (stompClient.reconnectDelay) {
        case 0: {
          stompClient.reconnectDelay = 1000;
          break;
        }
        case 1000: {
          stompClient.reconnectDelay = 5000;
          break;
        }
        case 5000: {
          stompClient.reconnectDelay = 10000;
          break;
        }
        case 10000: {
          stompClient.reconnectDelay = 30000;
          break;
        }
        case 30000: {
          stompClient.reconnectDelay = 60000;
          break;
        }
        default: {
          stompClient.reconnectDelay = 60000;
          break;
        }
      }
    });
  }, [currentUser?.id]);

  const history = useHistory();

  const [isListOpen, setIsListOpen] = useState(false);

  const [isSearchInputFilled, setIsSearchInputFilled] = useState(false);

  const [elasticContent, setElasticContent] = useState('');

  const bellRef = useRef(null);

  useEffect(() => {
    if (currentUser?.id) {
      fetchNotificationCount(currentUser.id);
    }
  }, [currentUser?.id]);

  const handleFetchNotifications = (onlyUnread, params) => {
    fetchNotificationList({ userId: currentUser.id, onlyUnread, params });
  };

  const handleFetchMoreNotifications = (onlyUnread, params) => {
    fetchMoreNotifications({ userId: currentUser.id, onlyUnread, params });
  };

  const toggleNotificationList = () => {
    if (!isListOpen) {
      handleFetchNotifications(true, { from: 0, count: 10 });
    } else {
      handleFetchNotifications(false, { from: 0, count: 1 });
    }
    setIsListOpen(!isListOpen);
  };

  const handleMarkAllNotificationsRead = () => {
    markAllNotificationsRead(currentUser.id);
  };

  const handleCreatePostButton = () => {
    if (isAuthorized) {
      history.push('/create/post');
    } else {
      history.push('/login');
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

  const goToSearchPage = () => {
    setIsSearchInputFilled(false);
    setElasticContent('');
    history.push(`/search?query=${elasticContent}`);
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
        {isListOpen && (
        <NotificationList
          fetchMoreNotifications={handleFetchMoreNotifications}
          notificationsLoading={notificationsLoading}
          markAllNotificationsRead={handleMarkAllNotificationsRead}
          fetchNotifications={handleFetchNotifications}
          bellRef={bellRef}
          markNotificationRead={markNotificationRead}
          setIsListOpen={setIsListOpen}
          list={notificationList}
        />
        )}
        <button ref={bellRef} className={styles.header_notification} type="button" onClick={toggleNotificationList}>
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
          <button type="button" onClick={goToSearchPage}>
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
    notificationsLoading: extractMarkAllNotificationsReadLoading(state) || extractFetchNotificationListLoading(state),
    currentUser: auth.auth.user,
    isAuthorized: auth.auth.isAuthorized,
    notificationCount: extractData(state).notificationCount,
    notificationList: extractData(state).notificationList,
    posts: extractData(state).posts
  };
};

const mapDispatchToProps: IActions = {
  markNotificationRead: markNotificationReadRoutine,
  markAllNotificationsRead: markAllNotificationsReadRoutine,
  fetchNotificationCount: fetchNotificationCountRoutine,
  fetchNotificationList: fetchNotificationListRoutine,
  fetchMoreNotifications: fetchMoreNotificationsRoutine,
  searchPostsByElastic: searchPostsByElasticRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
