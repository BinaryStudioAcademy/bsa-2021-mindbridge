import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { checkSidebarShown } from '@helpers/sidebarBlackList.helper';
import { history } from '@helpers/history.helper';
import Sidebar from '@screens/Sidebar/containers/SidebarPage';
import styles from './styles.module.scss';

const PublicRoute = ({ component: Component, ...rest }) => {
  const [isSidebarShown, setIsSidebarShown] = useState(checkSidebarShown());
  history.listen(() => {
    setIsSidebarShown(checkSidebarShown());
  });

  return (
    <Route
      {...rest}
      render={props => (isSidebarShown ? (
        <div className={styles.wrapper}>
          <Component {...props} />
          <Sidebar />
        </div>
      ) : (
        <Component {...props} />
      ))}
    />
  );
};

export default PublicRoute;
