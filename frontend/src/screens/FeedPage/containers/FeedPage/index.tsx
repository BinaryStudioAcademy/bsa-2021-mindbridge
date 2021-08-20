import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import PostCard from '@components/PostCard';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RootState } from '@root/store';
import { extractData, extractFetchDataLoading } from '@screens/FeedPage/reducers';
import { addMorePostsRoutine, fetchDataRoutine, likePostRoutine } from '@screens/FeedPage/routines';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import { IPostList } from '@screens/FeedPage/models/IPostList';
import LoaderWrapper from '@components/LoaderWrapper';
import ProfileSidebar from '@components/ProfileSidebar';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { disLikePostViewRoutine, fetchUserProfileRoutine, likePostViewRoutine } from '@screens/CreatePost/routines';
import { IUserProfile } from '@screens/CreatePost/models/IUserProfile';

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
  likePost: IBindingCallback1<object>;
  fetchUserProfile: IBindingCallback1<string>;
  setLoadMorePosts: IBindingAction;
  likePostView: IBindingCallback1<string>;
  disLikePostView: IBindingCallback1<string>;
}

const params = {
  from: 0,
  count: 10
};

const FeedPage: React.FC<IFeedPageProps> = (
  { data, fetchData, dataLoading, hasMore, setLoadMorePosts, loadMore,
    isAuthorized, currentUser, fetchUserProfile, userInfo, likePost, likePostView,
    disLikePostView }
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
  userInfo: state.createPostReducer.data.profile
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine,
  setLoadMorePosts: addMorePostsRoutine,
  fetchUserProfile: fetchUserProfileRoutine,
  likePost: likePostRoutine,
  likePostView: likePostViewRoutine,
  disLikePostView: disLikePostViewRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
