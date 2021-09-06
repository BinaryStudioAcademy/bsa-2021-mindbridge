import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from '../styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import {
  fetchUserRoutine
} from '@screens/ProfilePage/routines';
import { RootState } from '@root/store';
import { useLocation } from 'react-use';
import { NotFoundPage } from '@screens/NotFound/containers/NotFoundPage';
import LoaderWrapper from '@components/LoaderWrapper';
import PublicProfileCard from '@screens/ProfilePage/components/PublicProfileCard';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';

export interface IPublicProfilePageProps extends IState, IActions {
  userProfileData: any;
  isUserLoaded: boolean;
  isUserIdValid: boolean;
  isAuthorized: boolean;
  currentUserInfo: IUserProfile;
}

interface IState {
}

interface IActions {
  fetchUserData: IBindingCallback1<string>;
}

const PublicProfilePage: React.FC<IPublicProfilePageProps> = (
  { fetchUserData,
    userProfileData,
    isUserLoaded,
    isUserIdValid
  }
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
                <PublicProfileCard user={userProfileData} isUserLoaded={isUserLoaded} />
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
    userProfileData: data.user,
    isUserLoaded: data.isUserLoaded,
    isUserIdValid: data.isUserIdValid,
    isAuthorized: state.auth.auth.isAuthorized,
    currentUserInfo: state.postPageReducer.data.profile
  });
};

const mapDispatchToProps: IActions = {
  fetchUserData: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfilePage);
