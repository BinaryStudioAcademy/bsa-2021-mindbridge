import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IPostFeed } from '@screens/FeedPage/models/IPostFeed';
import { IBindingCallback1 } from '@models/Callbacks';
import {
  deleteFavouritePostRoutine,
  fetchFavouritePostsRoutine,
  setLoadMorePostsRoutine
} from '@screens/FavouritesPage/routines';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import PostCard from '@components/PostCard';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { extractFetchFavouritePostsLoading } from '@screens/FavouritesPage/reducers';
import LoaderWrapper from '@components/LoaderWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { isEmptyArray } from 'formik';
import NoResultsSvg from '@components/svgs/NoResultsSvg';

export interface IFavouritesPageProps extends IState, IActions {
  userInfo: IUserProfile;
}

interface IState {
  favouritePosts: IPostFeed[];
  currentUser: ICurrentUser;
  dataLoading: boolean;
  loadMore: boolean;
}

interface IActions {
  fetchFavouritePosts: IBindingCallback1<object>;
  setLoadMorePosts: IBindingCallback1<boolean>;
  deleteFavouritePost: IBindingCallback1<object>;
}

const params = {
  from: 0,
  count: 10,
  id: ''
};

const FavouritesPage: React.FC<IFavouritesPageProps> = (
  { favouritePosts, currentUser, fetchFavouritePosts, userInfo, dataLoading,
    setLoadMorePosts, loadMore, deleteFavouritePost }
) => {
  useEffect(() => {
    if (currentUser.id) {
      setLoadMorePosts(false);
      params.from = 0;
      fetchFavouritePosts({ id: currentUser.id, from: 0, count: 10 });
    }
  }, [currentUser]);

  const handleFavouriteAction = post => {
    deleteFavouritePost({ postId: post.id, userId: currentUser.id });
  };

  const handleLoadMorePosts = filtersPayload => {
    fetchFavouritePosts(filtersPayload);
  };

  const getMorePosts = () => {
    if (!dataLoading) {
      setLoadMorePosts(true);
      const { from, count } = params;
      params.from = from + count;
      params.id = currentUser.id;
      handleLoadMorePosts(params);
    }
  };

  if (dataLoading && !loadMore) {
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
      {!isEmptyArray(favouritePosts) && favouritePosts
      && <div className={styles.pageTitle}>Your favourites</div>}
      <InfiniteScroll
        style={{ overflow: 'none' }}
        next={getMorePosts}
        hasMore
        loader={' '}
        dataLength={favouritePosts ? favouritePosts.length : 0}
        scrollThreshold={0.9}
      >
        {!isEmptyArray(favouritePosts) && favouritePosts ? (
          favouritePosts.map(post => (
            <PostCard
              dataLoading={dataLoading}
              key={post.id}
              post={post}
              handleLikePost={undefined}
              handleDisLikePost={undefined}
              handleFavouriteAction={handleFavouriteAction}
              userInfo={userInfo}
            />
          ))
        ) : (
          <div className={styles.emptyFavourites}>
            <NoResultsSvg width="35%" height="35%" />
            <p className={styles.emptyLabel}>
              Favourites list is empty
            </p>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  favouritePosts: state.favouritesPageReducer.data.favouritePosts,
  currentUser: state.auth.auth.user,
  userInfo: state.postPageReducer.data.profile,
  dataLoading: extractFetchFavouritePostsLoading(state),
  loadMore: state.favouritesPageReducer.data.loadMore
});

const mapDispatchToProps: IActions = {
  fetchFavouritePosts: fetchFavouritePostsRoutine,
  setLoadMorePosts: setLoadMorePostsRoutine,
  deleteFavouritePost: deleteFavouritePostRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);
