import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

const FeedLogInSidebar: FunctionComponent = () => {
  const history = useHistory();
  return (
    <div className={styles.logInSideBar}>
      <div className={styles.title}>
        MindBridge is a community of 500.999 amazing developers
      </div>
      <div className={styles.description}>
        We&apos;re a place where coders share, stay up-to-date and grow their careers.
      </div>
      <button type="button" onClick={() => history.push('/registration')} className={`${styles.dark_button}`}>
        Create new account
      </button>
      <button type="button" onClick={() => history.push('/login')} className={styles.darkBorderButton}>
        Log in
      </button>
    </div>
  );
};

export default FeedLogInSidebar;
