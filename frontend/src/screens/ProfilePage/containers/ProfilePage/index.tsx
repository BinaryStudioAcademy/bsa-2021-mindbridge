import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import ProfileCard from '@screens/ProfilePage/components/ProfileCard';
import { IAppState } from '@models/AppState';
import { sendFormRoutine, sendNicknameRoutine } from '@screens/ProfilePage/routines';
import { RootState } from '@root/store';

export interface IProfileFormRequest {
  id: string;
  nickname: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface IProfilePageProps extends IState, IActions {
  initialData: any;
  initialState: any;
}

interface IState {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  sendForm: IBindingCallback1<object>;
  sendNickname: IBindingCallback1<string>;
}

const ProfilePage: React.FC<IProfilePageProps> = (
  { initialData, initialState, sendForm, sendNickname }
) => (
  <div className={styles.feedPage}>
    <div className={styles.main}>
      {/* eslint-disable-next-line max-len */}
      <ProfileCard initialData={initialData} initialState={initialState} sendForm={sendForm} sendNickname={sendNickname} />
    </div>
    <div className={styles.sidebar}>
      <div className={styles.tagsSideBar}>
        <FeedTagsSideBar />
      </div>
    </div>
  </div>
);

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
      isNicknameLoaded: data.isNicknameLoaded
    }
  });
};

const mapDispatchToProps: IActions = {
  sendForm: sendFormRoutine,
  sendNickname: sendNicknameRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
