import React, { FunctionComponent } from 'react';
import styles from '@components/PostHeaderInformation/styles.module.scss';
import FollowBtn from '@screens/ViewPost/components/Button/FollowBtn/FollowBtn';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import { getHowLong } from '@helpers/date.helper';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface IUserInfoPopup {
  author: any;
}

const UserInfoPopup: FunctionComponent<IUserInfoPopup> = ({ author }) => (
  <Popup
    style={{ top: '0px', left: '40px', width: '19rem' }}
    mouseEnterDelay={400}
    flowing
    hoverable
    content={(
      <div className={styles.userProfilePopup}>
        <div className={styles.overallInformation}>
          <div className={styles.followBtn}>
            <FollowBtn />
          </div>
          <Link to={`/user/${author.id}`}>
            <Image className={classNames(styles.userAvatar, styles.popup_img)} src={author.avatar ?? defaultAvatar} />
            <p className={styles.userNamePopup}>{author.nickname}</p>
          </Link>
          <p className={styles.timeOnPage}>{getHowLong(author.createdAt)}</p>
        </div>
        <div className={styles.statInformation}>
          <div className={styles.statCell}>
            <span>{author.rating}</span>
            <span>rating</span>
          </div>
          <div className={styles.statCell}>
            <span>{author.commentsQuantity}</span>
            <span>comments</span>
          </div>
          <div className={styles.statCell}>
            <span>{author.followersQuantity}</span>
            <span>followers</span>
          </div>
          <div className={styles.statCell}>
            <span>{author.postsQuantity}</span>
            <span>posts</span>
          </div>
        </div>
      </div>
    )}
    trigger={(
      <Link to={`/user/${author.id}`}>
        <Image src={author.avatar ?? defaultAvatar} />
        <span className={styles.userName}>{author.nickname}</span>
      </Link>
    )}
  />
);

export default UserInfoPopup;
