import React from 'react';
import styles from './styles.module.scss';
import Image_1 from './svg/svg1';
import Image_2 from './svg/svg2';
import Image_3 from './svg/svg3';
import Image_4 from './svg/svg4';
import Image_5 from './svg/svg5';
import Image_6 from './svg/svg6';
import Image_7 from './svg/svg7';
import Image_8 from './svg/svg8';

export interface IProfileSidebarProps {
}

function ProfileSidebar(props) {
  return (
    <div className={styles.profile_sidebar_container}>
      <div className={styles.top_group}>
        <div className={styles.avatar_and_name_group}>
          <a>
            <img className={styles.avatar} src={props.avatar} alt="avatar" ></img>
            <span className={styles.user_name}>{props.userName}</span>
          </a>
        </div>
        <div className={styles.following_and_rating_group}>
          <button className={styles.following}>
            <Image_1/>
            <div className={styles.followers_count}>
              {props.folloversCount} following
            </div>
          </button>
          <div className={styles.dot}></div>
          <button className={styles.rating}>
            <Image_2/>
            <div className={styles.rating_count}>
              {props.rating} rating
            </div>
          </button>
        </div>
        <button className={styles.settings_button}>
          <Image_3/>
        </button>
      </div>
      <div className={styles.sidebar_links}>
        <a>
          <Image_4/>
          <span>Drafts</span>
        </a>
        <a>
          <Image_5/>
          <span>Favorites</span>
        </a>
        <a>
          <Image_6/>
          <span>Highlights</span>
        </a>
        <a>
          <Image_7/>
          <span>Your posts</span>
          <div className={props.postNotificationCount ? styles.notification_count : styles.invisible}>
            {props.postNotificationCount}
          </div>
        </a>
        <a>
          <Image_8/>
          <span>Your contributions</span>
        </a>
      </div>
    </div>
  );
}

export default ProfileSidebar;
