import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from '../styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import {
  fetchUserRoutine, toggleFollowUserRoutine
} from '@screens/ProfilePage/routines';
import { RootState } from '@root/store';
import { useLocation } from 'react-use';
import { NotFoundPage } from '@screens/NotFound/containers/NotFoundPage';
import LoaderWrapper from '@components/LoaderWrapper';
import PublicProfileCard from '@screens/ProfilePage/components/PublicProfileCard';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { extractToggleFollowUserLoading } from '@screens/ProfilePage/reducers';

export interface IPublicProfilePageProps extends IState, IActions {
  userProfileData: any;
  isUserLoaded: boolean;
  isUserIdValid: boolean;
  isAuthorized: boolean;
  currentUser: ICurrentUser;
  isToggleFollowLoading: boolean;
}

interface IState {
}

interface IActions {
  fetchUserData: IBindingCallback1<string>;
  toggleFollowUser: IBindingCallback1<object>;
}

const PublicProfilePage: React.FC<IPublicProfilePageProps> = (
  { fetchUserData,
    userProfileData,
    isUserLoaded,
    isUserIdValid,
    isAuthorized,
    currentUser,
    toggleFollowUser,
    isToggleFollowLoading
=  }
) => {
  const location = useLocation();
  const currentId = location.pathname.substring(6, location.pathname.length);

  useEffect(() => {
    fetchUserData(currentId);
  }, [currentId]);

  return (
    <div>
      {isUserLoaded ? (
        <div>
          {isUserIdValid ? (
            <div className={styles.profilePage}>
              <div className={styles.main}>
                <PublicProfileCard
                  toggleFollowUser={toggleFollowUser}
                  currentUser={currentUser}
                  user={userProfileData}
                  isUserLoaded={isUserLoaded}
                  isToggleFollowLoading={isToggleFollowLoading}
                />
              </div>
            </div>
          ) : <NotFoundPage />}
        </div>
      )
        : (
          <div className={styles.profilePage}>
            <LoaderWrapper loading />
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { data } = state.profilePageReducer;
  return ({
    isToggleFollowLoading: extractToggleFollowUserLoading(state),
    userProfileData: data.user,
    isUserLoaded: data.isUserLoaded,
    isUserIdValid: data.isUserIdValid,
    isAuthorized: state.auth.auth.isAuthorized,
    currentUser: state.auth.auth.user
  });
};

const mapDispatchToProps: IActions = {
  fetchUserData: fetchUserRoutine,
  toggleFollowUser: toggleFollowUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfilePage);
