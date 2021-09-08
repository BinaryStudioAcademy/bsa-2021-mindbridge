import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IBindingCallback1 } from '@models/Callbacks';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { fetchUserProfileRoutine } from '@screens/PostPage/routines';
import { fetchPrsOfMyPostsRoutine } from '../../routines';
import PostContributionItem from '@root/components/PostContributionItem';
import { IContribution } from '@root/screens/ViewPost/models/IContribution';
import NoResultsSvg from '@root/components/svgs/NoResultsSvg';

export interface IContributionsToMyProps extends IState, IActions {
}

interface IState {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
  contributionsOfMyPosts: IContribution[];
}

interface IActions {
  fetchUserProfile: IBindingCallback1<string>;
  fetchPrsOfMyPosts: IBindingCallback1<string>;
}

const ContributionsToMyPosts: React.FC<IContributionsToMyProps> = (
  {
    currentUser,
    fetchUserProfile,
    contributionsOfMyPosts,
    fetchPrsOfMyPosts
  }
) => {
  useEffect(() => {
    if (currentUser.id) {
      fetchUserProfile(currentUser.id);
      fetchPrsOfMyPosts(currentUser.id);
    }
  }, [currentUser]);

  return (
    <div className={styles.postVersions}>
      <div className={styles.main}>
        <h3>
          Contributions to your posts
        </h3>
        {
          contributionsOfMyPosts.map(contribution => (
            <PostContributionItem
              key={contribution.id}
              postContribution={contribution}
            />
          ))
        }
        {!contributionsOfMyPosts[0] && (
          <div>
            <NoResultsSvg width="35%" height="35%" />
            <p> Seems like there are no result...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  isAuthorized: state.auth.auth.isAuthorized,
  currentUser: state.auth.auth.user,
  contributionsOfMyPosts: state.postVersionsReducer.data.myPostsContributions,
  userInfo: state.postPageReducer.data.profile,
  versionsOfPost: state.postPageReducer.data.versionsOfPost,
  postTitle: state.postVersionsReducer.data.postTitle
});

const mapDispatchToProps: IActions = {
  fetchUserProfile: fetchUserProfileRoutine,
  fetchPrsOfMyPosts: fetchPrsOfMyPostsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ContributionsToMyPosts);
