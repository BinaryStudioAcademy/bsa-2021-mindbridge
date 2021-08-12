import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import FeedTagsSideBar from '@components/FeedTagsSideBar';
import ProfileCard from '@screens/ProfilePage/components/ProfileCard';
import { IAppState } from '@models/AppState';
import { sendFormRoutine } from '@screens/ProfilePage/routines';

export interface IProfileFormRequest {
  nickname: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IProfilePageProps extends IState, IActions {
  initialData: any;
}

interface IState {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  sendForm: IBindingCallback1<object>;
}

const ProfilePage: React.FC<IProfilePageProps> = (
  { initialData, sendForm }
) => (
  <div className={styles.feedPage}>
    <div className={styles.main}>
      <ProfileCard initialData={initialData} sendForm={sendForm} />
    </div>
    <div className={styles.sidebar}>
      <div className={styles.tagsSideBar}>
        <FeedTagsSideBar />
      </div>
    </div>
  </div>
);

const mapStateToProps = (state: IAppState) => {
  const { user } = state.auth.auth;
  return ({
    initialData: {
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      avatar: user.avatar,
      email: user.email,
      password: user.password
    }
  });
};

const mapDispatchToProps: IActions = {
  sendForm: sendFormRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
