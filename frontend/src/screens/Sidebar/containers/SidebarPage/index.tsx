import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import ProfileSidebar from '@components/ProfileSidebar';
import SuggestChangesCard from '@screens/ViewPost/components/SuggestChangesCard';
import HistorySidebar from '@components/PostHistorySidebar';
import ContributionsSidebar from '@components/ContributionsSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import { useScroll } from '@helpers/scrollPosition.helper';
import { fetchUserProfileRoutine, getPostVersionsRoutine } from '@screens/PostPage/routines';
import { fetchPostContributionsRoutine } from '@screens/PostVersions/routines';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { IContribution } from '@screens/ViewPost/models/IContribution';
import { IBindingCallback1 } from '@models/Callbacks';
import { useParams } from 'react-router-dom';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { IPost } from '@screens/ViewPost/models/IPost';

export interface ISidebarProps extends IState, IActions {
}

interface IState {
  userInfo: IUserProfile;
  isAuthorized: boolean;
  versionsOfPost: IPostVersion[];
  contributionsOfPost: IContribution[];
  currentUser: ICurrentUser;
  post: IPost;
}

interface IActions {
  fetchPostContributions: IBindingCallback1<object>;
  fetchUserProfile: IBindingCallback1<string>;
  getPostVersions: IBindingCallback1<object>;
}

const Sidebar: React.FC<ISidebarProps> = (
  {
    isAuthorized,
    fetchUserProfile,
    versionsOfPost,
    contributionsOfPost,
    fetchPostContributions,
    getPostVersions,
    currentUser,
    userInfo,
    post
  }
) => {
  const { postId } = useParams();

  const [sidebarStyles, setSidebarStyles] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const scroll = useScroll();
  const sidebar = useRef(null);

  useEffect(() => {
    fetchUserProfile(currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    if (postId) {
      getPostVersions({ postId });
      fetchPostContributions({ postId });
    }
  }, [postId]);

  useEffect(() => {
    const offset = sidebar.current.offsetTop;
    const height = sidebar.current.offsetHeight;

    if (scroll.direction === 'up') {
      if (isFixed && scroll.y > height) {
        setIsFixed(false);
        setSidebarStyles({
          top: scroll.y - height,
          position: 'absolute'
        });
      } else if (scroll.y < offset) {
        setSidebarStyles({
          top: 128,
          position: 'fixed'
        });
      }
    } else {
      setSidebarStyles({
        ...sidebarStyles,
        position: 'absolute'
      });
      setIsFixed(true);
    }
  }, [scroll]);

  return (
    <div className={styles.sidebar}>
      <div ref={sidebar} className={styles.viewPostSideBar} style={sidebarStyles}>
        {isAuthorized ? (
          <div className={styles.suggestChanges}>
            <div className={styles.profileSideBar}>
              <ProfileSidebar
                id={userInfo.id}
                userName={userInfo.fullName ?? userInfo.nickname}
                avatar={userInfo.avatar}
                folloversCount={userInfo.followersQuantity}
                rating={userInfo.rating}
                postNotificationCount={userInfo.postsQuantity}
              />
            </div>
            {postId && (
              <div className={styles.contributions_sidebar_container}>
                <ContributionsSidebar contributions={contributionsOfPost} postId={post.id} />
              </div>
            )}
            {postId && post.author.id !== currentUser.id && (
              <SuggestChangesCard
                postId={post.id}
                isAuthor={post.author.id === currentUser.id}
              />
            )}
            {postId && currentUser.id === post?.author?.id && (
              <div className={styles.history_sidebar_container}>
                <HistorySidebar history={versionsOfPost} postId={postId} />
              </div>
            )}
            <div className={styles.tagsSideBar}>
              <FeedTagsSideBar />
            </div>
          </div>
        ) : (
          <div className={styles.logInSideBar}>
            <FeedLogInSidebar />
            <div className={styles.tagsSideBar}>
              <FeedTagsSideBar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  post: state.viewPostReducer.data.post,
  isAuthorized: state.auth.auth.isAuthorized,
  userInfo: state.postPageReducer.data.profile,
  currentUser: state.auth.auth.user,
  versionsOfPost: state.postPageReducer.data.versionsOfPost,
  contributionsOfPost: state.postVersionsReducer.data.postContributions
});

const mapDispatchToProps: IActions = {
  getPostVersions: getPostVersionsRoutine,
  fetchUserProfile: fetchUserProfileRoutine,
  fetchPostContributions: fetchPostContributionsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
