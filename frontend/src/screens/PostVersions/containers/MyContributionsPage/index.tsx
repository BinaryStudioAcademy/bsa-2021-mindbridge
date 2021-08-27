import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IBindingCallback1 } from '@models/Callbacks';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { fetchUserProfileRoutine } from '@screens/PostPage/routines';
import { IPostPR } from '@root/screens/PullRequest/models/IPostPR';
import { fetchMyPullRequestsRoutine } from '@root/screens/PullRequest/routines';
import MyContributionItem from '@root/components/MyContributionsItem';

export interface IMyContributionsProps extends IState, IActions {
}

interface IState {
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  userInfo: IUserProfile;
  contributionsOfAuthor: IPostPR[];
}

interface IActions {
  fetchUserProfile: IBindingCallback1<string>;
  fetchMyPRs: IBindingCallback1<string>;
}

const MyContributions: React.FC<IMyContributionsProps> = (
  {
    currentUser,
    fetchUserProfile,
    contributionsOfAuthor,
    fetchMyPRs
  }
) => {
  useEffect(() => {
    if (currentUser.id) {
      fetchUserProfile(currentUser.id);
      fetchMyPRs(currentUser.id);
    }
  }, [currentUser]);

  return (
    <div className={styles.postVersions}>
      <div className={styles.main}>
        <h3>
          Your contributions
        </h3>
        {
          contributionsOfAuthor.map(contribution => (
            <MyContributionItem
              key={contribution.id}
              contribution={contribution}
            />
          ))
        }
        {!contributionsOfAuthor && (
          <p>
            🔍 Seems like there are no result...
          </p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  isAuthorized: state.auth.auth.isAuthorized,
  currentUser: state.auth.auth.user,
  contributionsOfAuthor: state.postVersionsReducer.data.authorContributions,
  userInfo: state.postPageReducer.data.profile,
  versionsOfPost: state.postPageReducer.data.versionsOfPost,
  postTitle: state.postVersionsReducer.data.postTitle
});

const mapDispatchToProps: IActions = {
  fetchUserProfile: fetchUserProfileRoutine,
  fetchMyPRs: fetchMyPullRequestsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(MyContributions);
