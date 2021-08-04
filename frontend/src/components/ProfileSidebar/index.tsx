import React from 'react';
import styles from './styles.module.scss';
import Svg1 from './svg/svg1';
import Svg2 from './svg/svg2';
import Svg3 from './svg/svg3';
import Svg4 from './svg/svg4';
import Svg5 from './svg/svg5';
import Svg6 from './svg/svg6';
import Svg7 from './svg/svg7';
import Svg8 from './svg/svg8';
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
            <Svg1 />
            <div className={styles.followers_count}>
              {folloversCount}
              {' '}
              following
            </div>
          </button>
          <div className={styles.dot} />
          <button type="button" className={styles.rating}>
            <Svg2 />
            <div className={styles.rating_count}>
              {rating}
              {' '}
              rating
            </div>
          </button>
        </div>
        <button type="button" className={styles.settings_button}>
          <Svg3 />
        </button>
      </div>
      <div className={styles.sidebar_links}>
        <Link to="/">
          <Svg4 />
          <span>Drafts</span>
        </Link>
        <Link to="/">
          <Svg5 />
          <span>Favorites</span>
        </Link>
        <Link to="/">
          <Svg6 />
          <span>Highlights</span>
        </Link>
        <Link to="/">
          <Svg7 />
          <span>Your posts</span>
          <div className={postNotificationCount ? styles.notification_count : styles.invisible}>
            {postNotificationCount}
          </div>
        </Link>
        <Link to="/">
          <Svg8 />
          <span>Your contributions</span>
        </Link>
      </div>
    </div>
  );
}

export default ProfileSidebar;
