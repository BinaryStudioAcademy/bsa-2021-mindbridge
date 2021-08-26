import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN } from '@screens/Login/constants/auth_constants';
import { checkSidebarShown } from '@helpers/sidebarBlackList.helper';
import { history } from '@helpers/history.helper';
import Sidebar from '@screens/Sidebar/containers/SidebarPage';
import styles from './styles.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateRoute = ({ component: Component, ...rest }) => {
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

export default PrivateRoute;
