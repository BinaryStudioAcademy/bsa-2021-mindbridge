import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import PublicRoute from 'components/PublicRoute';
import Default from 'screens/Default/containers/DefaultPage';
import CreatePostPage from '@root/screens/PostPage/containers/CreatePostPage';
import EditPostPage from '@root/screens/PostPage/containers/EditPostPage';
import FeedPage from '@screens/FeedPage/containers/FeedPage';
import ProfilePage from '@screens/ProfilePage/containers/ProfilePage';
import PublicProfilePage from '@screens/ProfilePage/containers/PublicProfilePage';
import ViewPost from '@screens/ViewPost/containers/ViewPostPage';
import LoginPage from 'screens/Login/containers/LoginPage';
import RegistrationPage from 'screens/Login/containers/RegisterPage';
import oauth2handler from '@components/OAuth2RedirectHandler/OAuth2RedirectHandler';
import { history } from '@helpers/history.helper';
import Header from '@screens/Header/containers/HeaderPage';
import PrivateRoute from '@components/PrivateRoute';
import { NotFoundPage } from '@screens/NotFound/containers/NotFoundPage';
import PullRequestPage from '@root/screens/PullRequest/containers/PullRequestPage';
import PostVersions from '@screens/PostVersions/containers/PostVersionsPage';
import EditPrPage from '@root/screens/PostPage/containers/EditPrPage';
import MyContributionsPage from '@root/screens/PostVersions/containers/MyContributionsPage';
import { checkHeaderShown } from '@helpers/headerBlackList.hepler';
import HighlightsPage from '@screens/HighlightsPage/containers/HighlightsPage';
import PostVersionPage from '@screens/PostVersionPage/containers/PostVersionPage';
import Drafts from '@screens/Drafts/containers/DraftsPage';

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => {
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
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/registration" component={RegistrationPage} />
        <PublicRoute exact path="/oauth2/resolve" component={oauth2handler} />
        <PublicRoute exact path="/post/:postId" component={ViewPost} />
        <PublicRoute exact path="/create/post" component={CreatePostPage} />
        <PublicRoute exact path="/profile" component={ProfilePage} />
        <PublicRoute exact path="/user/:userId" component={PublicProfilePage} />
        <PublicRoute exact path="/pullRequest/:id" component={PullRequestPage} />
        <PublicRoute exact path="/pullRequest/edit/:id" component={EditPrPage} />
        <PublicRoute exact path="/create/post" component={CreatePostPage} />
        <PublicRoute exact path="/post/edit/:id" component={EditPostPage} />
        <PublicRoute exact path="/postVersion/:id" component={PostVersionPage} />
        <PublicRoute exact path="/post/versions/:id" component={PostVersions} />
        <PublicRoute exact path="/post/contributions/:id" component={PostVersions} />
        <PublicRoute exact path="/highlights" component={HighlightsPage} />
        <PublicRoute exact path="/my/contributions" component={MyContributionsPage} />
        <PublicRoute exact path="/drafts" component={Drafts} />
        <PublicRoute component={NotFoundPage} />

        <div>
          <LoaderWrapper loading={isLoading}>
            <Switch>
              <PrivateRoute exact path="/create/post" component={CreatePostPage} />
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
