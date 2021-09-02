import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import PostCard from '@components/PostCard';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RootState } from '@root/store';
import { extractData, extractFetchDataLoading } from '@screens/FeedPage/reducers';
import { addMorePostsRoutine, fetchDataRoutine, likePostRoutine, resetDataRoutine } from '@screens/FeedPage/routines';
import { IPostList } from '@screens/FeedPage/models/IPostList';
import LoaderWrapper from '@components/LoaderWrapper';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { loadCurrentUserRoutine } from '@screens/Login/routines';
import { disLikePostViewRoutine, fetchUserProfileRoutine, likePostViewRoutine } from '@screens/PostPage/routines';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { useLocation } from 'react-use';

export interface IFeedPageProps extends IState, IActions {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
}

interface IState {
  data: IPostList;
  dataLoading: boolean;
  hasMore: boolean;
  loadMore: boolean;
}

interface IActions {
  fetchData: IBindingCallback1<object>;
  resetList: IBindingAction;
  likePost: IBindingCallback1<object>;
  fetchUserProfile: IBindingCallback1<string>;
  setLoadMorePosts: IBindingAction;
  likePostView: IBindingCallback1<string>;
  disLikePostView: IBindingCallback1<string>;
  loadUser: IBindingAction;
}

const params = {
  from: 0,
  count: 10
};

const FeedPage: React.FC<IFeedPageProps> = (
  { data, fetchData, dataLoading, hasMore, setLoadMorePosts, loadMore,
    currentUser, userInfo, likePost, likePostView,
    disLikePostView, isAuthorized, resetList }
) => {
  const location = useLocation();
  const filter = location.pathname.substring(1, location.pathname.length);

  useEffect(() => {
    resetList();
    params.from = 0;
    params.count = 10;
    fetchData({ params, filter });
  }, [filter]);

  useEffect(() => {
    fetchData({ params, filter });
  }, [fetchData]);
  const handleLoadMorePosts = filtersPayload => {
    fetchData({ params: filtersPayload, filter });
  };
  const handleLikePost = postId => {
    const post = {
      postId,
      userId: currentUser.id,
      liked: true
    };
    likePostView(postId);
    likePost(post);
  };

  const handleDisLikePost = postId => {
    const post = {
      postId,
      userId: currentUser.id,
      liked: false
    };
    disLikePostView(postId);
    likePost(post);
  };

  const getMorePosts = () => {
    setLoadMorePosts();
    const { from, count } = params;
    params.from = from + count;
    handleLoadMorePosts(params);
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
    <div className={styles.feedPage}>
      <div className={styles.main}>
        <InfiniteScroll
          style={{ overflow: 'none' }}
          dataLength={data.posts.length}
          next={getMorePosts}
          hasMore={hasMore}
          loader={' '}
          scrollThreshold={0.9}
        >
          {data.posts.length !== 0 ? (
            data.posts.map(post => (
              <PostCard
                key={post.id}
                handleLikePost={handleLikePost}
                handleDisLikePost={handleDisLikePost}
                post={post}
                userInfo={userInfo}
              />
            ))
          ) : (
            <p>
              🔍 Seems like there are no posts...
              Please try another query
            </p>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state),
  dataLoading: extractFetchDataLoading(state),
  hasMore: state.feedPageReducer.data.hasMore,
  loadMore: state.feedPageReducer.data.loadMore,
  isAuthorized: state.auth.auth.isAuthorized,
  currentUser: state.auth.auth.user,
  userInfo: state.postPageReducer.data.profile
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine,
  resetList: resetDataRoutine,
  setLoadMorePosts: addMorePostsRoutine,
  fetchUserProfile: fetchUserProfileRoutine,
  likePost: likePostRoutine,
  likePostView: likePostViewRoutine,
  disLikePostView: disLikePostViewRoutine,
  loadUser: loadCurrentUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
