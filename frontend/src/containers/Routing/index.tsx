import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import PublicRoute from 'components/PublicRoute';
import Default from 'screens/Default/containers/DefaultPage';
import PrivateRoute from '@root/components/PrivateRoute';
import CreatePostPage from '@root/screens/CreatePost/containers/CreatePostPage';
import FeedPage from '@screens/FeedPage/containers/FeedPage';
import ViewPost from '@screens/ViewPost/containers/ViewPostPage';
import Login from 'screens/Login/containers/LoginPage';
import LoginPage from 'screens/Login/containers/LoginPage';
import RegistrationPage from 'screens/Login/containers/RegisterPage';
import oauth2handler from '@components/OAuth2RedirectHandler/OAuth2RedirectHandler';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { toastr } from 'react-redux-toastr';
import Header from '@screens/Header/containers/HeaderPage';

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => {
  React.useEffect(() => {
    const stompClient = Stomp.over(() => new SockJS('/api/ws'));
    stompClient.reconnectDelay = 10000;
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/greeting', () => {
        toastr.success('Success', 'Socket loaded!');
      });
    });
  });

  return (
    <div>
      <Header />
      <Switch>
        <PublicRoute exact path="/public" component={Default} />
        <PublicRoute exact path="/" component={FeedPage} />
        <PublicRoute exact path="/post" component={ViewPost} />
        <PublicRoute exact path={['/login', '/registration']} component={Login} />
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/registration" component={RegistrationPage} />
        <PublicRoute exact path="/oauth2/resolve" component={oauth2handler} />
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
};

export default Routing;
