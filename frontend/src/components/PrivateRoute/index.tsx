import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN } from '@screens/Login/constants/auth_constants';
import { checkSidebarShown } from '@helpers/sidebarBlackList.helper';
import { history } from '@helpers/history.helper';
import Sidebar from '@screens/Sidebar/containers/SidebarPage';
import styles from './styles.module.scss';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { fetchUserProfileRoutine } from '@components/PrivateRoute/routine';
import { connect } from 'react-redux';
import { RootState } from '@root/store';
import EmailConfirmation from '@screens/EmailConfirmation/containers/EmailConfirmationPage';

interface IPrivateRouteProps {
  emailVerified: boolean;
}

interface IState {
  emailVerified: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateRoute = ({ component: Component, emailVerified, ...rest }) => {
  const [isSidebarShown, setIsSidebarShown] = useState(checkSidebarShown());
  history.listen(() => {
    setIsSidebarShown(checkSidebarShown());
  });

  return (
    <Route
      {...rest}
      render={props => {
        // get token
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
        if (!emailVerified) {
          return (
            <EmailConfirmation />
          );
        }
        if (isSidebarShown) {
          return (
            <div className={styles.wrapper}>
              <Component {...props} />
              <Sidebar />
            </div>
          );
        }
        return (
          <Component {...props} />
        );
      }}
    />
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  emailVerified: state.privateRouteReducer.profile.emailVerified
});

const mapDispatchToProps = {
  fetchUser: fetchUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
