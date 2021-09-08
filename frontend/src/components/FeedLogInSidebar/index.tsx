import React, { FunctionComponent, useEffect } from 'react';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import { IBindingAction } from '@root/models/Callbacks';
import { RootState } from '@root/store';
import { connect } from 'react-redux';
import { fetchAllUsersNumberRoutine } from '@root/screens/FeedPage/routines';

export interface IFeedLoginSidebarProps extends IState, IActions {
}

interface IState {
  numberOfAllUsers: number;
}

interface IActions {
  getNumberOfAllUsers: IBindingAction;
}

const FeedLogInSidebar: FunctionComponent<IFeedLoginSidebarProps> = ({ numberOfAllUsers, getNumberOfAllUsers }) => {
  const history = useHistory();

  useEffect(() => {
    getNumberOfAllUsers();
  });

  const handleLoginButton = () => {
    history.push('/login');
  };

  const handleRegistrationButton = () => {
    history.push('/registration');
  };

  return (
    <div className={styles.logInSideBar}>
      <div className={styles.title}>
        MindBridge is a community of
        {' '}
        {new Intl.NumberFormat().format(numberOfAllUsers)}
        {' '}
        amazing developers
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

const mapStateToProps: (state: RootState) => IState = state => ({
  numberOfAllUsers: state.feedPageReducer.data.numberOfAllUsers
});

const mapDispatchToProps: IActions = {
  getNumberOfAllUsers: fetchAllUsersNumberRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedLogInSidebar);
