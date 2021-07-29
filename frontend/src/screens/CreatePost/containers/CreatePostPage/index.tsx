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
const userName = "Charlie Culhane";
const avatar = "https://lh3.googleusercontent.com/proxy/KA7uim8AQvkXZU1zJyDVZAqC9UiYiR3Pf5cf_bzkxisffCmWtY9-JJ6xrCRe7i7eJVxjZenryL2wa4U";
const folloversCount = 10;
const rating = 543;
const postNotificationCount = 4;

const CreatePost: React.FC<ICreatePostProps> = (
  { children }
) => (
  <div className={classNames('content_wrapper', styles.container)}>
    <Header notificationCount={notificationCount}/>
    <ProfileSidebar 
      userName={userName} 
      avatar={avatar}
      folloversCount={folloversCount}
      rating={rating}
      postNotificationCount={postNotificationCount}
    />
    create post
  </div>
);

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
