import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

const FeedLogInSidebar: FunctionComponent = () => {
  const history = useHistory();

  const handleLoginButton = () => {
    history.push('/login');
    history.go();
  };

  const handleRegistrationButton = () => {
    history.push('/registration');
    history.go();
  };

  return (
    <div className={styles.logInSideBar}>
      <div className={styles.title}>
        MindBridge is a community of 500.999 amazing developers
      </div>
      <div className={styles.description}>
        We&apos;re a place where coders share, stay up-to-date and grow their careers.
      </div>
      <button type="button" onClick={handleRegistrationButton} className={styles.dark_button}>
        Create new account
      </button>
      <button type="button" onClick={handleLoginButton} className={styles.dark_button}>
        Log in
      </button>
    </div>
  );
};

export default FeedLogInSidebar;
