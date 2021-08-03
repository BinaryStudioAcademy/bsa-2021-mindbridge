import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import PublicRoute from 'components/PublicRoute';
import Default from 'screens/Default/containers/DefaultPage';
import PrivateRoute from '@root/components/PrivateRoute';
import CreatePostPage from '@root/screens/CreatePost/containers/CreatePostPage';
import Login from 'screens/Login/containers/LoginPage';

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => (
  <div>
    {/* {isAuthorized ? <Header /> : ''} */}
    <Switch>
      <PublicRoute exact path="/public" component={Default} />
      <PublicRoute exact path={['/login', '/registration']} component={Login} />
      <div>
        <LoaderWrapper loading={isLoading}>
          <Switch>
            {/* <PrivateRoute
              exact
              path="/private"
              component={Private}
            /> */}
            <PrivateRoute
              exact
              path="/create/post"
              component={CreatePostPage}
            />
            <Route path="/*">
              <Redirect to="/public" />
            </Route>
          </Switch>
        </LoaderWrapper>
      </div>
    </Switch>
  </div>
);

export default Routing;
