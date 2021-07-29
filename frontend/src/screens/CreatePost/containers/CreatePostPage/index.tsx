import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Header from '@root/components/Header';
import ProfileSidebar from '@root/components/ProfileSidebar';

export interface ICreatePostProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}
//use real value
const notificationCount = 3;

const CreatePost: React.FC<ICreatePostProps> = (
  { children }
) => (
  <div className={classNames('content_wrapper', styles.container)}>
    <Header notificationCount={notificationCount}/>
    <ProfileSidebar/>
    create post
  </div>
);

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
