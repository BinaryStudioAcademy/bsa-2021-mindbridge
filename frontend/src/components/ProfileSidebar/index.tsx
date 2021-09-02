import React from 'react';
import styles from './styles.module.scss';
import FollowersSvg from './svg/followersSvg';
import StarSvg from './svg/starSvg';
import SettingsSvg from './svg/settingsSvg';
import DraftSvg from './svg/draftsSvg';
import FavoritesSvg from './svg/favorites';
import HighlightsSvg from './svg/highlightsSvg';
import PostsSvg from './svg/posts';
import ContributorsSvg from './svg/contributors';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { handleOnClickSignOut } from '@helpers/signOut.helper';

export interface IProfileSidebarProps {
}

function ProfileSidebar({ id, avatar, userName, folloversCount, rating, postNotificationCount }) {
  const history = useHistory();

  const handleProfileButton = () => {
    history.push('/profile');
  };

  return (
    <div className={styles.profile_sidebar_container}>
      <div className={styles.top_group}>
        <div className={styles.avatar_and_name_group}>
          <Link to={`/user/${id}`}>
            <img
              className={styles.avatar}
              src={avatar ?? 'https://i.imgur.com/LaWyPZF.png'}
              alt="avatar"
            />
            <span className={styles.user_name}>{userName}</span>
          </Link>
        </div>
        <div className={styles.following_and_rating_group}>
          <button type="button" className={styles.following}>
            <FollowersSvg />
            <div className={styles.followers_count}>
              {folloversCount}
              {' '}
              following
            </div>
          </button>
          <div className={styles.dot} />
          <button type="button" className={styles.rating}>
            <StarSvg />
            <div className={styles.rating_count}>
              {rating}
              {' '}
              rating
            </div>
          </button>
        </div>
        <Dropdown
          icon={<SettingsSvg />}
          floating
          labeled
          button
        >
          <Dropdown.Menu>
            <Dropdown.Item icon="user circle" text="Edit profile" onClick={handleProfileButton} />
            <Dropdown.Item icon="log out" text="Sign out" onClick={handleOnClickSignOut} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={styles.sidebar_links}>
        <Link to="/drafts">
          <DraftSvg />
          <span>Drafts</span>
        </Link>
        <Link to="/favourites">
          <FavoritesSvg />
          <span>Favorites</span>
        </Link>
        <Link to="/">
          <HighlightsSvg />
          <span>Highlights</span>
        </Link>
        <Link to="/">
          <PostsSvg />
          <span>Your posts</span>
          <div className={postNotificationCount ? styles.post_notification_count : styles.invisible}>
            <div className={styles.count}>
              {postNotificationCount}
            </div>
          </div>
        </Link>
        <Link to="/my/contributions">
          <ContributorsSvg />
          <span>Your contributions</span>
        </Link>
      </div>
    </div>
  );
}

export default ProfileSidebar;
