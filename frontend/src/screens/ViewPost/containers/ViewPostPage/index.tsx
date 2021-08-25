import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import { RootState } from '@root/store';
import { extractData } from '@screens/ViewPost/reducers';
import { fetchDataRoutine, leaveReactionOnPostViewPageRoutine } from '@screens/ViewPost/routines';
import ViewPostCard from '@screens/ViewPost/components/ViewPostCard';
import SuggestChangesCard from '@screens/ViewPost/components/SuggestChangesCard';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import { IData } from '@screens/ViewPost/models/IData';
import { useParams } from 'react-router-dom';
import ProfileSidebar from '@components/ProfileSidebar';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { fetchUserProfileRoutine, getPostVersionsRoutine, disLikePostViewRoutine, likePostViewRoutine }
  from '@screens/PostPage/routines';
import HistorySidebar from '@components/PostHistorySidebar';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { useScroll } from '@helpers/scrollPosition.helper';
import ContributionsSidebar from '@components/ContributionsSidebar';
import { fetchPostContributionsRoutine } from '@screens/PostVersions/routines';
import { IContribution } from '@screens/ViewPost/models/IContribution';
import TextSelector from 'text-selection-react';

export interface IViewPostProps extends IState, IActions {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
  versionsOfPost: IPostVersion[];
  contributionsOfPost: IContribution[];
}

interface IState {
  data: IData;
}

interface IActions {
  fetchData: IBindingCallback1<string>;
  fetchUserProfile: IBindingCallback1<string>;
  getPostVersions: IBindingCallback1<object>;
  leaveReaction: IBindingCallback1<object>;
  likePostView: IBindingCallback1<string>;
  disLikePostView: IBindingCallback1<string>;
  fetchPostContributions: IBindingCallback1<object>;
}

const ViewPost: React.FC<IViewPostProps> = (
  {
    data,
    fetchData,
    isAuthorized,
    currentUser,
    fetchUserProfile,
    userInfo,
    getPostVersions,
    versionsOfPost,
    leaveReaction,
    likePostView,
    disLikePostView,
    fetchPostContributions,
    contributionsOfPost
  }
) => {
  const { id } = useParams();
  const [sidebarStyles, setSidebarStyles] = useState({
    top: 0,
    position: 'fixed' as any
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const scroll = useScroll();
  const sidebar = useRef(null);

  useEffect(() => {
    fetchUserProfile(currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    fetchData(id);
    getPostVersions({ postId: id });
    fetchPostContributions({ postId: id });
  }, [id]);
  const handleLikePost = postId => {
    const post = {
      postId,
      userId: currentUser.id,
      liked: true
    };
    likePostView(postId);
    leaveReaction(post);
  };

  const handleDisLikePost = postId => {
    const post = {
      postId,
      userId: currentUser.id,
      liked: false
    };
    disLikePostView(postId);
    leaveReaction(post);
  };
  useEffect(() => {
    const offset = sidebar.current.offsetTop;
    const height = sidebar.current.offsetHeight;

    if (scroll.direction === 'up') {
      if (isScrolled && window.scrollY - height > 0) {
        setIsScrolled(false);
        setSidebarStyles({
          top: window.scrollY - height,
          position: 'absolute' as any
        });
      } else if (window.scrollY < offset) {
        setSidebarStyles({
          top: 100,
          position: 'fixed' as any
        });
      }
    } else {
      setSidebarStyles({
        ...sidebarStyles,
        position: 'absolute' as any
      });
      setIsScrolled(true);
    }
  }, [scroll]);

  // document.onmouseup = () => {
  //   console.log(window.getSelection().toString());
  // };
  return (
    <div className={styles.viewPost}>
      <div className={styles.main}>
        <ViewPostCard
          post={data.post}
          handleLikePost={handleLikePost}
          handleDisLikePost={handleDisLikePost}
          userInfo={userInfo}
          isAuthor={data.post.author.id === currentUser.id}
        />
      </div>
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
              {data.post.author.id !== currentUser.id && (
                <SuggestChangesCard
                  postId={data.post.id}
                  isAuthor={data.post.author.id === currentUser.id}
                />
              )}
              {currentUser.id === data.post?.author?.id && (
                <div className={styles.history_sidebar_container}>
                  <HistorySidebar history={versionsOfPost} postId={id} />
                </div>
              )}
              <div className={styles.contributions_sidebar_container}>
                <ContributionsSidebar contributions={contributionsOfPost} postId={data.post.id} />
              </div>
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
    </div>
  );
};

const mapStateToProps: (state: RootState) => IState = state => ({
  data: extractData(state),
  isAuthorized: state.auth.auth.isAuthorized,
  currentUser: state.auth.auth.user,
  contributionsOfPost: state.postVersionsReducer.data.postContributions,
  userInfo: state.postPageReducer.data.profile,
  versionsOfPost: state.postPageReducer.data.versionsOfPost
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine,
  getPostVersions: getPostVersionsRoutine,
  fetchUserProfile: fetchUserProfileRoutine,
  leaveReaction: leaveReactionOnPostViewPageRoutine,
  likePostView: likePostViewRoutine,
  disLikePostView: disLikePostViewRoutine,
  fetchPostContributions: fetchPostContributionsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
