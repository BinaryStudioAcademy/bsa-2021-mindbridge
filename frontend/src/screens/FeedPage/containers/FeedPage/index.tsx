import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import PostCard from '@components/PostCard';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RootState } from '@root/store';
import { extractData, extractFetchDataLoading } from '@screens/FeedPage/reducers';
import { addMorePostsRoutine, fetchDataRoutine } from '@screens/FeedPage/routines';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import { IPostList } from '@screens/FeedPage/models/IPostList';
import LoaderWrapper from '@components/LoaderWrapper';
import ProfileSidebar from '@components/ProfileSidebar';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { fetchUserProfileRoutine } from '@screens/PostPage/routines';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';

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
  fetchData: IBindingCallback1<Record<string, number>>;
  fetchUserProfile: IBindingCallback1<string>;
  setLoadMorePosts: IBindingAction;
}

const params = {
  from: 0,
  count: 10
};

const FeedPage: React.FC<IFeedPageProps> = (
  { data, fetchData, dataLoading, hasMore, setLoadMorePosts, loadMore,
    isAuthorized, currentUser, fetchUserProfile, userInfo }
) => {
  useEffect(() => {
    fetchData(params);
    if (currentUser) {
      fetchUserProfile(currentUser.id);
    }
  }, [currentUser, fetchUserProfile, fetchData]);

  const handleLoadMorePosts = filtersPayload => {
    fetchData(filtersPayload);
  };

  const getMorePosts = () => {
    setLoadMorePosts();
    const { from, count } = params;
    params.from = from + count;
    handleLoadMorePosts(params);
  };

  if (dataLoading === true && loadMore === false) {
    return (
      <LoaderWrapper loading={dataLoading} />
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
          {data.posts[0].id ? (
            data.posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
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
      <div className={styles.sidebar}>
        <div className={styles.feedPageSidebars}>
          <div className={styles.logInSideBar}>
            {isAuthorized ? (
              <ProfileSidebar
                id={userInfo.id}
                userName={userInfo.fullName}
                avatar={userInfo.avatar}
                folloversCount={userInfo.followersQuantity}
                rating={userInfo.rating}
                postNotificationCount={userInfo.postsQuantity}
              />
            ) : (
              <FeedLogInSidebar />
            )}
          </div>
          <div className={styles.tagsSideBar}>
            <FeedTagsSideBar />
          </div>
        </div>
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
  setLoadMorePosts: addMorePostsRoutine,
  fetchUserProfile: fetchUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
