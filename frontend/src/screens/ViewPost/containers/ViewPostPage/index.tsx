import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import { RootState } from '@root/store';
import { extractData } from '@screens/ViewPost/reducers';
import { fetchDataRoutine } from '@screens/ViewPost/routines';
import ViewPostCard from '@screens/ViewPost/components/ViewPostCard';
import SuggestChangesCard from '@screens/ViewPost/components/SuggestChangesCard';
import FeedLogInSidebar from '@components/FeedLogInSidebar';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import { IData } from '@screens/ViewPost/models/IData';
import { useParams } from 'react-router-dom';
import ProfileSidebar from '@components/ProfileSidebar';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { fetchUserProfileRoutine, getPostVersionsRoutine } from '@screens/PostPage/routines';
import HistorySidebar from '@components/PostHistorySidebar';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import ContributionsSidebar from '@components/ContributionsSidebar';
import { fetchPostContributionsRoutine } from '@screens/PostVersions/routines';
import { IContribution } from '@screens/ViewPost/models/IContribution';

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
    fetchPostContributions,
    contributionsOfPost
  }
) => {
  const { id } = useParams();

  useEffect(() => {
    fetchUserProfile(currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    fetchData(id);
    getPostVersions({ postId: id });
    fetchPostContributions({ postId: id });
  }, [id]);

  return (
    <div className={styles.viewPost}>
      <div className={styles.main}>
        <ViewPostCard
          post={data.post}
          isAuthor={data.post.author.id === currentUser.id}
        />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.viewPostSideBar}>
          {isAuthorized ? (
            <div className={styles.suggestChanges}>
              <div className={styles.profileSideBar}>
                <ProfileSidebar
                  id={userInfo.id}
                  userName={userInfo.fullName}
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
  fetchPostContributions: fetchPostContributionsRoutine,
  fetchUserProfile: fetchUserProfileRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
