import React, {useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import PublicRoute from 'components/PublicRoute';
import Default from 'screens/Default/containers/DefaultPage';
import PrivateRoute from '@root/components/PrivateRoute';
import CreatePostPage from '@root/screens/CreatePost/containers/CreatePostPage';
import FeedPage from '@screens/FeedPage/containers/FeedPage';
import Login from 'screens/Login/containers/LoginPage';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { toastr } from 'react-redux-toastr';
import { history } from '@helpers/history.helper';
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

  const checkHeaderShown = () => {
    const headerBlackList = ['/login', '/registration'];

    return headerBlackList.every(item => !history.location.pathname.startsWith(item));
  };
  const [isHeaderShown, setIsHeaderShown] = useState(checkHeaderShown());

  history.listen(() => {
    setIsHeaderShown(checkHeaderShown());
  });

  return (
    <div>
      {isHeaderShown && <Header />}
      <Switch>
        <PublicRoute exact path="/public" component={Default} />
        <PublicRoute exact path="/" component={FeedPage} />
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
};

export default Routing;
