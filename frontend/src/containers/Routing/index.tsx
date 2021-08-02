import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import PublicRoute from 'components/PublicRoute';
import Default from 'screens/Default/containers/DefaultPage';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => {

  React.useEffect(() => {
    const stompClient = Stomp.over(() => new SockJS("http://localhost:5000/ws"));
    stompClient.reconnect_delay = 10000;
    //stompClient.reconnectDelay = 10000; Are they different?
    stompClient.connect({}, frame => {
      stompClient.subscribe("/topic/greeting", greeting => {
        console.log("hi " + JSON.parse(greeting.body).message);
      });
    } );

    return () => {
      // @ts-ignore
      stompClient.onDisconnect(() => {});
    };
  });

  return (
    <div>
      {/* {isAuthorized ? <Header /> : ''} */}
      <Switch>
        <PublicRoute exact path="/public" component={Default} />
        <div>
          <LoaderWrapper loading={isLoading}>
            <Switch>
              {/* <PrivateRoute
              exact
              path="/private"
              component={Private}
            /> */}
              <Route path="/*">
                <Redirect to="/public" />
              </Route>
            </Switch>
          </LoaderWrapper>
        </div>
      </Switch>
    </div>
  )
};

export default Routing;
