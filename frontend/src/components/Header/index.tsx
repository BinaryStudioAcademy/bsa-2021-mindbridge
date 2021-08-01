import React from 'react';
import styles from './styles.module.scss';
import Logo from '../Logo/Logo';
import BellSvg from './svg/bellSvg';
import SearchSvg from './svg/searchSvg';
import BlueButton from '../buttons/Blue_button';
import ColorlessButton from '../buttons/ColorlessButton';
import NotificationCount from '../NotificationCount';
import DarkButton from '../buttons/DarcButton';

function Header({ notificationCount }) {
  return (
    <div className={styles.header_container}>
      <div className={styles.left}>
        <Logo width={99} height={44} />
        <div className={styles.header_menu}>
          <BlueButton content="Home" />
          <ColorlessButton content="Hot posts" />
          <ColorlessButton content="Best posts" />
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.header_notification} type="button">
          <BellSvg />
          <NotificationCount notificationCount={notificationCount} />
        </button>
        <div className={styles.search_input}>
          <input type="text" placeholder="Search..." />
          <button type="button">
            <SearchSvg />
          </button>
        </div>
        <DarkButton className={styles.create_post_button} content="Create post" />
      </div>
    </div>
  );
}

export default Header;
