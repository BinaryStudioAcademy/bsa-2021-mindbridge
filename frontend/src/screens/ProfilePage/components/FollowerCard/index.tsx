import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import { Link } from 'react-router-dom';

interface IFollowerCardProps {
  follower: any;
}
const FollowerCard: FunctionComponent<IFollowerCardProps> = ({ follower }) => (
  <div className={styles.followerCard}>
    <Link to={`/user/${follower.followerId}`}>
      <Image src={follower.avatar ?? defaultAvatar} />
      <p className={styles.userName}>{follower.nickname}</p>
    </Link>
  </div>
);

export default FollowerCard;
