/* eslint-disable max-len */
import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getHowLong } from '@helpers/date.helper';
import LoaderWrapper from '@components/LoaderWrapper';
import RatingSvg from '@screens/ProfilePage/components/svg/ratingSvg';
import { Link } from 'react-router-dom';
import CommentSvg from '@screens/ProfilePage/components/svg/commentSvg';
import FollowersSvg from '@screens/ProfilePage/components/svg/followersSvg';
import PostsSvg from '@screens/ProfilePage/components/svg/posts';
import ContributorsSvg from '@screens/ProfilePage/components/svg/contributorsSvg';
import { IUser } from '@screens/ProfilePage/models/IUser';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import FollowersModal from '@screens/ProfilePage/components/FollowersModal';
import classNames from 'classnames';

interface IPublicProfileCardProps {
  user: IUser;
  isUserLoaded: boolean;
}
const PublicProfileCard: FunctionComponent<IPublicProfileCardProps> = (
  { user, isUserLoaded }
) => {
  const [userData, setUserData] = useState(user);
  const [isModalFollowersOpen, setIsModalFollowersOpen] = useState(false);
  const [isModalFollowingOpen, setIsModalFollowingOpen] = useState(false);
  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <div className={styles.viewCard}>
      {isUserLoaded ? (
        <div className={styles.contentWrp}>
          <FollowersModal
            followers={isModalFollowersOpen ? (user.followers) : (user.following)}
            setIsModalFollowersOpen={setIsModalFollowersOpen}
            isModalFollowersOpen={isModalFollowersOpen}
            setIsModalFollowingOpen={setIsModalFollowingOpen}
            isModalFollowingOpen={isModalFollowingOpen}
          />
          <div className={styles.avatarWrp}>
            <div className={styles.imgContainer}>
              { (userData.avatar === '' || userData.avatar === null) ? (
                <Image
                  className={styles.avatar}
                  src={defaultAvatar}
                  alt="avatar"
                />
              ) : (
                <Image
                  className={styles.avatar}
                  src={userData.avatar}
                  alt="avatar"
                />
              )}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.inputWrp}>
                <div className={styles.headerTextWrp}>
                  <span className={styles.name}>
                    {userData.firstName}
                    {' '}
                    {userData.lastName}
                  </span>
                  { userData.nickname !== null && (
                  <span className={styles.nickname}>
                    {`@${userData.nickname}`}
                  </span>
                  ) }
                  <span className={styles.period}>
                    {getHowLong(userData.createdAt)}
                  </span>
                </div>
                <button type="button" className={styles.dark_button}>
                  <span>Follow</span>
                </button>
              </div>
            </div>
            <div className={styles.statWrp}>
              <div className={styles.statCell}>
                <RatingSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.rating}
                  </span>
                  <span>
                    rating
                  </span>
                </div>
              </div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div className={classNames(styles.statCell, styles.followersNumber)} onClick={() => setIsModalFollowersOpen(true)}>
                <FollowersSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.followersQuantity}
                  </span>
                  <span>
                    followers
                  </span>
                </div>
              </div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div className={classNames(styles.statCell, styles.followersNumber)} onClick={() => setIsModalFollowingOpen(true)}>
                <FollowersSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.followingQuantity}
                  </span>
                  <span>
                    following
                  </span>
                </div>
              </div>
              <div className={styles.statCell}>
                <CommentSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.commentsQuantity}
                  </span>
                  <span>
                    comments
                  </span>
                </div>
              </div>
              <div className={styles.statCell}>
                <PostsSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.postsQuantity}
                  </span>
                  <span>
                    posts
                  </span>
                </div>
              </div>
              <div className={styles.statCell}>
                <ContributorsSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.contributionsQuantity}
                  </span>
                  <span>
                    contribution
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.articlesWrp} />
            <span className={styles.subTitle}>
              {`Articles by ${userData.firstName}`}
            </span>
            <div>
              {userData.lastArticleTitles.map(postTitle => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <Link className={styles.articleTitle} to={`/post/${postTitle.id}`}>
                  {postTitle.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )
        : <LoaderWrapper className={styles.buttonLoader} loading={isUserLoaded} />}
    </div>
  );
};

export default PublicProfileCard;
