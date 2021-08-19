import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import ProfileSidebar from '@components/ProfileSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import { fetchUserProfileRoutine, getPostVersionsRoutine } from '@screens/CreatePost/routines';
import { useParams } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IUserProfile } from '@screens/CreatePost/models/IUserProfile';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { IBindingCallback1, IBindingCallback2 } from '@models/Callbacks';
import PostVersionItem from '@components/PostVersionItem';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface IPostVersionsProps extends IState, IActions {
}

interface IState {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
  versionsOfPost: IPostVersion[];
  hasMore: boolean;
}

interface IActions {
  fetchUserProfile: IBindingCallback1<string>;
  getPostVersions: IBindingCallback2<string, object>;
}

const params = {
  from: 0,
  count: 10
};

const PostVersions: React.FC<IPostVersionsProps> = (
  {
    isAuthorized,
    hasMore,
    currentUser,
    userInfo,
    versionsOfPost,
    getPostVersions,
    fetchUserProfile
  }
) => {
  const { postId } = useParams();

  useEffect(() => {
    getPostVersions(postId, params);
  }, [postId]);

  useEffect(() => {
    fetchUserProfile(currentUser.id);
  }, [currentUser]);

  const getMorePostVersions = () => {
    getPostVersions(postId, params);
    const { from, count } = params;
    params.from = from + count;
  };

  return (
    <div className={styles.postVersions}>
      <div className={styles.main}>
        <InfiniteScroll
          style={{ overflow: 'none' }}
          dataLength={versionsOfPost.length}
          next={getMorePostVersions}
          hasMore={hasMore}
          loader={' '}
          scrollThreshold={0.9}
        >
          {versionsOfPost ? (
            versionsOfPost.map(version => (
              <PostVersionItem
                key={version.id}
                postVersion={version}
              />
            ))
          ) : (
            <p>
              🔍 Seems like there are no post versions...
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

const mapStateToProps: (state) => IState = state => ({
  isAuthorized: state.auth.auth.isAuthorized,
  currentUser: state.auth.auth.user,
  userInfo: state.createPostReducer.data.profile,
  versionsOfPost: state.createPostReducer.data.versionsOfPost,
  hasMore: state.createPostReducer.data.hasMore
});

const mapDispatchToProps: IActions = {
  getPostVersions: getPostVersionsRoutine,
  fetchUserProfile: fetchUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PostVersions);
