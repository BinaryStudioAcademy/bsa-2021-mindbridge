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
import { extractFetchFavouritePostsLoading } from '@screens/FavouritesPage/reducers';
import LoaderWrapper from '@components/LoaderWrapper';

export interface IFavouritesPageProps extends IState, IActions {
  userInfo: IUserProfile;
}

interface IState {
  favouritePosts: IPost[];
  currentUser: ICurrentUser;
  dataLoading: boolean;
}

interface IActions {
  fetchFavouritePosts: IBindingCallback1<object>;
}

const FavouritesPage: React.FC<IFavouritesPageProps> = (
  { favouritePosts, currentUser, fetchFavouritePosts, userInfo, dataLoading }
) => {
  useEffect(() => {
    if (currentUser.id) {
      fetchFavouritePosts({ id: currentUser.id, from: 0, count: 50 });
    }
  }, [currentUser]);

  if (dataLoading) {
    return (
      <div className={styles.feedPage}>
        <div className={styles.main}>
          <LoaderWrapper className={styles.loader} loading={dataLoading} />
        </div>
      </div>
    );
  }
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
  userInfo: state.postPageReducer.data.profile,
  dataLoading: extractFetchFavouritePostsLoading(state)
});

const mapDispatchToProps: IActions = {
  fetchFavouritePosts: fetchFavouritePostsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);
