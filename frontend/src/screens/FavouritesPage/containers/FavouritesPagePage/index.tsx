import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IPost } from '@screens/FeedPage/models/IPost';
import { IBindingCallback1 } from '@models/Callbacks';
import { fetchFavouritePostsRoutine } from '@screens/FavouritesPage/routines';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import PostCard from '@components/PostCard';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { userInfo } from 'os';

export interface IFavouritesPageProps extends IState, IActions {
  userInfo: IUserProfile;
}

interface IState {
  favouritePosts: IPost[];
  currentUser: ICurrentUser;
}

interface IActions {
  fetchFavouritePosts: IBindingCallback1<object>;
}

const FavouritesPage: React.FC<IFavouritesPageProps> = (
  { favouritePosts, currentUser, fetchFavouritePosts, userInfo }
) => {
  useEffect(() => {
    if (currentUser.id) {
      fetchFavouritePosts({ id: currentUser.id, from: 0, count: 50 });
    }
  }, [currentUser]);
  return (
    <div className={classNames('content_wrapper', styles.container)}>
      {favouritePosts ? (
        favouritePosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            handleLikePost=""
            handleDisLikePost=""
            userInfo={userInfo}
          />
        ))
      ) : (
        <p>
          🔍 Seems like there are no posts...
          Please try another query
        </p>
      )}
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  favouritePosts: state.favouritesPageReducer.data.favouritePosts,
  currentUser: state.auth.auth.user,
  userInfo: state.postPageReducer.data.profile
});

const mapDispatchToProps: IActions = {
  fetchFavouritePosts: fetchFavouritePostsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);
