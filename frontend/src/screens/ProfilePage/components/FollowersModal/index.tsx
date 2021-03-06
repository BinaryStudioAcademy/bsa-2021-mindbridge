import React, { FunctionComponent } from 'react';
import { Modal } from 'semantic-ui-react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import styles from './styles.module.scss';
import FollowerCard from '@screens/ProfilePage/components/FollowerCard';

interface IFollowersModalProps {
  setIsModalFollowersOpen: IBindingCallback1<boolean>;
  setIsModalFollowingOpen: IBindingCallback1<boolean>;
  isModalFollowersOpen: boolean;
  isModalFollowingOpen: boolean;
  followers: any;
  isOwnProfile: boolean;
  handleFollowUser: IBindingCallback1<string>;
  isUnfollowLoading: boolean;
}
const FollowersModal: FunctionComponent<IFollowersModalProps> = ({ setIsModalFollowersOpen, isModalFollowersOpen,
  isModalFollowingOpen, followers, setIsModalFollowingOpen, handleFollowUser, isUnfollowLoading, isOwnProfile }) => {
  const handleOpenModal = () => {
    setIsModalFollowersOpen(false);
    setIsModalFollowingOpen(false);
  };
  return (
    <Modal
      closeIcon
      onClose={handleOpenModal}
      open={isModalFollowersOpen || isModalFollowingOpen}
      size="mini"
    >
      <Modal.Header>{isModalFollowersOpen ? ('Followers') : ('Following')}</Modal.Header>
      <Modal.Content scrolling>
        {followers.length !== 0 ? (
          <div className={styles.followerWrapper}>
            {followers.map(follower => (
              <FollowerCard
                isOwnProfile={isOwnProfile}
                isUnfollowLoading={isUnfollowLoading}
                handleFollowUser={handleFollowUser}
                key={follower.id}
                follower={follower}
              />
            ))}
          </div>
        ) : (
          <p className={styles.emptyLabel}>
            {isModalFollowersOpen ? ('Followers list is empty')
              : ('Following list is empty')}
          </p>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default FollowersModal;
