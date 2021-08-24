import React, { useEffect } from 'react';
import styles from '../PostVersionsPage/styles.module.scss';
import { connect } from 'react-redux';
import ProfileSidebar from '@components/ProfileSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IBindingCallback1 } from '@models/Callbacks';
import PostVersionItem from '@components/PostVersionItem';
import { IContribution } from '@screens/ViewPost/models/IContribution';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { fetchUserProfileRoutine } from '@screens/PostPage/routines';

export interface IMyContributionsProps extends IState, IActions {
}

interface IState {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
  contributionsOfPost: IContribution[];
}

interface IActions {
  fetchUserProfile: IBindingCallback1<string>;
}

const params = {
  from: 0,
  count: 50
};

const MyContributions: React.FC<IMyContributionsProps> = (
  {
    isAuthorized,
    currentUser,
    userInfo,
    fetchUserProfile,
    contributionsOfPost,
  }
) => {
  useEffect(() => {
    if (currentUser.id) {
      fetchUserProfile(currentUser.id);
    }
  }, [currentUser]);

  return (
    <div className={styles.postVersions}>
      <div className={styles.main}>
        <h3>
          My contributions
        </h3>
        {
          contributionsOfPost.map(version => (
            <PostVersionItem
              key={version.id}
              postVersion={version}
              isVersion={false}
            />
          ))
        }
        {!contributionsOfPost && (
          <p>
            🔍 Seems like there are no result...
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
  contributionsOfPost: state.postVersionsReducer.data.postContributions,
  userInfo: state.postPageReducer.data.profile,
  versionsOfPost: state.postPageReducer.data.versionsOfPost,
  postTitle: state.postVersionsReducer.data.postTitle
});

const mapDispatchToProps: IActions = {
  fetchUserProfile: fetchUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MyContributions);
