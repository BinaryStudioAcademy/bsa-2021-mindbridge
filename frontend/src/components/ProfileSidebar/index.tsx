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
import { Link } from 'react-router-dom';

export interface IProfileSidebarProps {
}

function ProfileSidebar({ avatar, userName, folloversCount, rating, postNotificationCount }) {
  return (
    <div className={styles.profile_sidebar_container}>
      <div className={styles.top_group}>
        <div className={styles.avatar_and_name_group}>
          <Link to="/">
            <img className={styles.avatar} src={avatar} alt="avatar" />
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
        <button type="button" className={styles.settings_button}>
          <SettingsSvg />
        </button>
      </div>
      <div className={styles.sidebar_links}>
        <Link to="/">
          <DraftSvg />
          <span>Drafts</span>
        </Link>
        <Link to="/">
          <FollowersSvg />
          <span>Favorites</span>
        </Link>
        <Link to="/">
          <HighlightsSvg />
          <span>Highlights</span>
        </Link>
        <Link to="/">
          <PostsSvg />
          <span>Your posts</span>
          <div className={postNotificationCount ? styles.notification_count : styles.invisible}>
            {postNotificationCount}
          </div>
        </Link>
        <Link to="/">
          <ContributorsSvg />
          <span>Your contributions</span>
        </Link>
      </div>
    </div>
  );
}

export default ProfileSidebar;
