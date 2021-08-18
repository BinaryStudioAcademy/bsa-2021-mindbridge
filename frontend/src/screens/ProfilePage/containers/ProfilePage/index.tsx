import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import ProfileCard from '@screens/ProfilePage/components/ProfileCard';
import {
  openPasswordChangeModalRoutine,
  sendAvatarRoutine, sendChangePasswordFormRoutine,
  sendFormRoutine,
  sendNicknameRoutine
} from '@screens/ProfilePage/routines';
import { RootState } from '@root/store';
import PasswordChangeModal from '@screens/ProfilePage/components/PasswordChangeModal';
import { useLocation } from 'react-use';
import { NotFoundPage } from '@screens/NotFound/containers/NotFoundPage';
import LoaderWrapper from '@components/LoaderWrapper';

export interface IProfileFormRequest {
  id: string;
  nickname: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface IChangePasswordFormRequest {
  id: string;
  password: string;
  newPassword: string;
}

export interface IProfilePageProps extends IState, IActions {
  initialData: any;
  initialState: any;
  modalInitialState: any;
  isPasswordChangeModalOpen: boolean;
}

interface IState {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  sendForm: IBindingCallback1<object>;
  sendChangePasswordForm: IBindingCallback1<object>;
  sendAvatar: IBindingCallback1<object>;
  sendNickname: IBindingCallback1<string>;
  openPasswordChangeModal: IBindingCallback1<boolean>;
}

const ProfilePage: React.FC<IProfilePageProps> = (
  { initialData,
    initialState,
    modalInitialState,
    sendForm,
    sendChangePasswordForm,
    sendAvatar,
    sendNickname,
    openPasswordChangeModal
  }
) => {
  const location = useLocation();
  const currentId = location.pathname.substring(6, location.pathname.length);
  return (
    <div>
      { initialData.id !== '' ? (
        <div>
          { currentId === initialData.id ? (
            <div className={styles.profilePage}>
              <PasswordChangeModal
                userId={initialData.id}
                openPasswordChangeModal={openPasswordChangeModal}
                sendChangePasswordForm={sendChangePasswordForm}
                modalInitialState={modalInitialState}
              />
              <div className={styles.main}>
                {/* eslint-disable-next-line max-len */}
                <ProfileCard
                  initialData={initialData}
                  initialState={initialState}
                  sendForm={sendForm}
                  sendAvatar={sendAvatar}
                  sendNickname={sendNickname}
                  openPasswordChangeModal={openPasswordChangeModal}
                />
              </div>
              <div className={styles.sidebar}>
                <div className={styles.tagsSideBar}>
                  <FeedTagsSideBar />
                </div>
              </div>
            </div>
          ) : <NotFoundPage /> }
        </div>
      )
        : <LoaderWrapper loading />}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { user } = state.auth.auth;
  const { data } = state.profilePageReducer;
  return ({
    initialData: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      avatar: user.avatar,
      email: user.email,
      createdAt: user.createdAt
    },
    initialState: {
      isNicknameEngaged: data.isNicknameEngaged,
      isFormLoaded: data.isFormLoaded,
      isNicknameLoaded: data.isNicknameLoaded,
      savingAvatar: data.savingAvatar
    },
    modalInitialState: {
      isPasswordChangeModalOpen: data.isPasswordChangeModalOpen,
      isPasswordRight: data.isPasswordRight,
      isChangePasswordFormLoaded: data.isChangePasswordFormLoaded
    }
  });
};

const mapDispatchToProps: IActions = {
  sendForm: sendFormRoutine,
  sendChangePasswordForm: sendChangePasswordFormRoutine,
  sendAvatar: sendAvatarRoutine,
  sendNickname: sendNicknameRoutine,
  openPasswordChangeModal: openPasswordChangeModalRoutine.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
