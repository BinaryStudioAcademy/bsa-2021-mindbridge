import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { IBindingCallback1 } from '@models/Callbacks';
import PostVersionItem from '@components/PostVersionItem';
import { fetchPostContributionsRoutine, fetchPostTitleRoutine } from '@screens/PostVersions/routines';
import { IContribution } from '@screens/ViewPost/models/IContribution';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { fetchUserProfileRoutine, getPostVersionsRoutine } from '@screens/PostPage/routines';

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
    currentUser,
    versionsOfPost,
    getPostVersions,
    fetchUserProfile,
    fetchPostTitle,
    fetchPostContributions,
    contributionsOfPost,
    postTitle
  }
) => {
  const { id } = useParams();
  const location = useLocation();
  const [isVersions, setIsVersions] = useState(true);

  useEffect(() => {
    fetchPostTitle(id);
    if (location.pathname.includes('versions')) {
      setIsVersions(true);
      getPostVersions({ postId: id, params });
    } else {
      setIsVersions(false);
      fetchPostContributions({ postId: id, params });
    }
  }, [id]);

  useEffect(() => {
    if (currentUser.id) {
      fetchUserProfile(currentUser.id);
    }
  }, [currentUser]);

  return (
    <div className={styles.postVersions}>
      <h3>
        {isVersions ? 'Versions' : 'Contributions'}
        {' '}
        of post
      </h3>
      <h2 className={styles.postName}>{postTitle}</h2>
      {isVersions ? (
        versionsOfPost.map(version => (
          <PostVersionItem
            key={version.id}
            postVersion={version}
            isVersion={isVersions}
          />
        ))
      ) : (
        contributionsOfPost.map(version => (
          <PostVersionItem
            key={version.id}
            postVersion={version}
            isVersion={isVersions}
          />
        ))
      )}
      {!versionsOfPost && !contributionsOfPost && (
        <p>
          🔍 Seems like there are no result...
        </p>
      )}
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
