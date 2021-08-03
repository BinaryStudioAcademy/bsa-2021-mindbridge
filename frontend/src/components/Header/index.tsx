import React from 'react';
import styles from './styles.module.scss';
import Logo from '../Logo/Logo';
import Image1 from './svg/svg1';
import Image2 from './svg/svg2';

function Header({ notificationCount }) {
  return (
    <div className={styles.header_container}>
      <div className={styles.left}>
        <Logo width={99} height={44} />
        <div className={styles.header_menu}>
          <button className={styles.blue_button} type="button"> Home </button>
          <button className={styles.colorless_button} type="button"> Hot posts </button>
          <button className={styles.colorless_button} type="button"> Best posts </button>
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.header_notification} type="button">
          <Image1 />
          <div className={notificationCount ? styles.notification_count : styles.invisible}>
            {notificationCount}
          </div>
        </button>
        <div className={styles.search_input}>
          <input type="text" placeholder="Search..." />
          <button type="button">
            <Image2 />
          </button>
        </div>
        <button type="button" className={`${styles.dark_button} ${styles.create_post_button}`}>Create post</button>
      </div>
    </div>
  );
}

export default Header;
