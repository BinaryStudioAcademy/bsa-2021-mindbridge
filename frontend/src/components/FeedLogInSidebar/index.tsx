import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

const FeedLogInSidebar: FunctionComponent = () => (
  <div className={styles.logInSideBar}>
    <div className={styles.title}>
      MindBridge is a community of 500.999 amazing developers
    </div>
    <div className={styles.description}>
      We&apos;re a place where coders share, stay up-to-date and grow their careers.
    </div>
    <button type="button" className={`${styles.dark_button}`}>Create new account</button>
    <button type="button" className={styles.darkBorderButton}>Log in</button>
  </div>
);

export default FeedLogInSidebar;
