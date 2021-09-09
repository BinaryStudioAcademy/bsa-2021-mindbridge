import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from '../styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import ProfileCard from '@screens/ProfilePage/components/ProfileCard';
import {
  deleteAvatarRoutine,
  openPasswordChangeModalRoutine,
  sendAvatarRoutine, sendChangePasswordFormRoutine,
  sendFormRoutine,
  sendNicknameRoutine
} from '@screens/ProfilePage/routines';
import { RootState } from '@root/store';
import PasswordChangeModal from '@screens/ProfilePage/components/PasswordChangeModal';
import LoaderWrapper from '@components/LoaderWrapper';
import { fetchUserProfileRoutine } from '@screens/PostPage/routines';

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
  onReloadSidebar: boolean;
}

interface IState {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  sendForm: IBindingCallback1<object>;
  sendChangePasswordForm: IBindingCallback1<object>;
  sendAvatar: IBindingCallback1<object>;
  sendNickname: IBindingCallback1<string>;
  deleteAvatar: IBindingCallback1<string>;
  openPasswordChangeModal: IBindingCallback1<boolean>;
  fetchUserProfile: IBindingCallback1<string>;
}

const ProfilePage: React.FC<IProfilePageProps> = (
  { initialData,
    initialState,
    modalInitialState,
    sendForm,
    sendChangePasswordForm,
    sendAvatar,
    deleteAvatar,
    sendNickname,
    openPasswordChangeModal,
    fetchUserProfile,
    onReloadSidebar
  }
) => {
  useEffect(() => {
    fetchUserProfile(initialData.id);
  }, [onReloadSidebar]);

  return (
    <div>
      {initialData.id ? (
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
              deleteAvatar={deleteAvatar}
              sendNickname={sendNickname}
              openPasswordChangeModal={openPasswordChangeModal}
            />
          </div>
        </div>
      ) : (
        <div className={styles.profilePage}>
          <LoaderWrapper loading />
        </div>
      )}
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
    },
    onReloadSidebar: data.onReloadSidebar
  });
};

const mapDispatchToProps: IActions = {
  sendForm: sendFormRoutine,
  sendChangePasswordForm: sendChangePasswordFormRoutine,
  sendAvatar: sendAvatarRoutine,
  fetchUserProfile: fetchUserProfileRoutine,
  sendNickname: sendNicknameRoutine,
  deleteAvatar: deleteAvatarRoutine,
  openPasswordChangeModal: openPasswordChangeModalRoutine.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
