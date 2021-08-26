import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import ProfileSidebar from '@components/ProfileSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import { useParams, useLocation } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { IBindingCallback1 } from '@models/Callbacks';
import PostVersionItem from '@components/PostVersionItem';
import { fetchPostContributionsRoutine, fetchPostTitleRoutine } from '@screens/PostVersions/routines';
import { IContribution } from '@screens/ViewPost/models/IContribution';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { fetchUserProfileRoutine, getPostVersionsRoutine } from '@screens/PostPage/routines';
import { PrState } from '@root/screens/PullRequest/models/IPostPR';
import PostContributionItem from '@root/components/PostContributionItem';

export interface IPostVersionsProps extends IState, IActions {
}

interface IState {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
  versionsOfPost: IPostVersion[];
  contributionsOfPost: IContribution[];
  postTitle: string;
}

interface IActions {
  fetchUserProfile: IBindingCallback1<string>;
  getPostVersions: IBindingCallback1<object>;
  fetchPostTitle: IBindingCallback1<string>;
  fetchPostContributions: IBindingCallback1<object>;
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
    fetchPostContributions,
    contributionsOfPost,
    postTitle
  }
) => {
  const { postId } = useParams();
  const location = useLocation();
  const [isVersions, setIsVersions] = useState(true);
  const [seeOpenPRs, setSeeOpenPRs] = useState(true);

  useEffect(() => {
    fetchPostTitle(postId);
    if (location.pathname.includes('versions')) {
      setIsVersions(true);
      getPostVersions({ postId, params });
    } else {
      setIsVersions(false);
      fetchPostContributions({ postId, params });
    }
  }, [postId]);

  useEffect(() => {
    if (currentUser.id) {
      fetchUserProfile(currentUser.id);
    }
  }, [currentUser]);

  const handleCheckbox = () => {
    setSeeOpenPRs(!seeOpenPRs);
  };

  const contributionsList = [];

  if (seeOpenPRs) {
    contributionsOfPost.forEach(contribution => {
      if (contribution.state === PrState.open) {
        contributionsList.push(
          <PostContributionItem
            key={contribution.id}
            postContribution={contribution}
          />
        );
      }
    });
  } else {
    contributionsOfPost.forEach(contribution => {
      contributionsList.push(
        <PostContributionItem
          key={contribution.id}
          postContribution={contribution}
        />
      );
    });
  }

  return (
    <div className={styles.postVersions}>
      <div className={styles.main}>
        <h3>
          {isVersions ? 'Versions' : 'Contributions'}
          {' '}
          of post
        </h3>
        <h2 className={styles.postName}>{postTitle}</h2>
        {!isVersions
          && (
          <div className={styles.see_open}>
            <input type="checkbox" checked={seeOpenPRs} />
            {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
              jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div onClick={handleCheckbox} />
            <div className={styles.checkbox_label}>Show only open pull requests</div>
          </div>
          )}
        {isVersions ? (
          versionsOfPost.map(version => (
            <PostVersionItem
              key={version.id}
              postVersion={version}
            />
          ))
        ) : contributionsList}
        {!versionsOfPost && !contributionsOfPost && (
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
  getPostVersions: getPostVersionsRoutine,
  fetchPostTitle: fetchPostTitleRoutine,
  fetchPostContributions: fetchPostContributionsRoutine,
  fetchUserProfile: fetchUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PostVersions);
