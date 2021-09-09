import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import { Link } from 'react-router-dom';
import { IBindingCallback1 } from '@models/Callbacks';
import DarkBorderButton from '@components/buttons/DarcBorderButton';

interface IFollowerCardProps {
  follower: any;
  isUnfollowLoading: boolean;
  handleFollowUser: IBindingCallback1<string>;
  isOwnProfile: boolean;
}
const FollowerCard: FunctionComponent<IFollowerCardProps> = (
  {
    follower,
    isUnfollowLoading,
    handleFollowUser,
    isOwnProfile
  }
) => (
  <div className={styles.followerCard}>
    <Link to={`/user/${follower.followerId}`}>
      <Image src={follower.avatar ?? defaultAvatar} />
      <p className={styles.userName}>{follower.nickname}</p>
    </Link>
    {isOwnProfile && (
      <DarkBorderButton
        content="Unfollow"
        loading={isUnfollowLoading}
        onClick={() => handleFollowUser(follower.followerId)}
      />
    )}

  </div>
);

export default FollowerCard;
