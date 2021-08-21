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
import { IBindingAction, IBindingCallback1, IBindingCallback2 } from '@models/Callbacks';
import PostVersionItem from '@components/PostVersionItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPostTitleRoutine } from '@screens/PostVersions/routines';

export interface IPostVersionsProps extends IState, IActions {
}

interface IState {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
  versionsOfPost: IPostVersion[];
  postTitle: string;
}

interface IActions {
  fetchUserProfile: IBindingCallback1<string>;
  getPostVersions: IBindingCallback1<object>;
  fetchPostTitle: IBindingCallback1<string>;
}

const params = {
  from: 0,
  count: 50
};

const PostVersions: React.FC<IPostVersionsProps> = (
  {
    isAuthorized,
    currentUser,
    userInfo,
    versionsOfPost,
    getPostVersions,
    fetchUserProfile,
    fetchPostTitle,
    postTitle
  }
) => {
  const { postId } = useParams();

  useEffect(() => {
    getPostVersions({ postId, params });
    fetchPostTitle(postId);
  }, [postId]);

  useEffect(() => {
    if (currentUser.id) {
      fetchUserProfile(currentUser.id);
    }
  }, [currentUser]);

  return (
    <div className={styles.postVersions}>
      <div className={styles.main}>
        <h3>Versions of post</h3>
        <h2 className={styles.postName}>{postTitle}</h2>
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
  postTitle: state.postVersionsReducer.data.postTitle
});

const mapDispatchToProps: IActions = {
  getPostVersions: getPostVersionsRoutine,
  fetchPostTitle: fetchPostTitleRoutine,
  fetchUserProfile: fetchUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PostVersions);
