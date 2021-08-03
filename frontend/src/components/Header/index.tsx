import React from 'react';
import styles from './styles.module.scss';
import Logo from '../Logo/Logo';
import Image_1 from './svg/svg1';
import Image_2 from './svg/svg2';


function Header(props) {
  return (
    <div className={styles.header_container}>
      <div className={styles.left}>
        <Logo width={99} height={44} />
        <div className={styles.header_menu}>
          <button className={styles.blue_button}> Home </button>
          <button className={styles.colorless_button}> Hot posts </button>
          <button className={styles.colorless_button}> Best posts </button>
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.header_notification}>
          <Image_1/>
          <div className={props.notificationCount ? styles.notification_count : styles.invisible}>
            {props.notificationCount}
          </div>
        </button>
        <div className={styles.search_input}>
          <input type="text" placeholder="Search..." />
          <button>
            <Image_2/>
          </button>
        </div>
        <button className={`${styles.dark_button} ${styles.create_post_button}`}>Create post</button>
      </div>
    </div>
  );
}

export default Header;
