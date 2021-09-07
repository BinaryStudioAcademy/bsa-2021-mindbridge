/* eslint-disable max-len */
import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import styles from './styles.module.scss';
import { getHowLong } from '@helpers/date.helper';
import LoaderWrapper from '@components/LoaderWrapper';
import RatingSvg from '@screens/ProfilePage/components/svg/ratingSvg';
import { Link, useHistory } from 'react-router-dom';
import CommentSvg from '@screens/ProfilePage/components/svg/commentSvg';
import FollowersSvg from '@screens/ProfilePage/components/svg/followersSvg';
import PostsSvg from '@screens/ProfilePage/components/svg/posts';
import ContributorsSvg from '@screens/ProfilePage/components/svg/contributorsSvg';
import { IUser } from '@screens/ProfilePage/models/IUser';
import { IBindingCallback1 } from '@root/models/Callbacks';
import { fetchAchievementsByUserRoutine } from '../../routines';
import { connect } from 'react-redux';
import { IAchievementToUser } from '../../models/IAchievementToUser';
import Achievement from '@root/components/Achievement';
import ScrollLifeSvg from './svg/scrollLiftSvg';
import ScrollRightSvg from './svg/scrollRightSvg';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import DarkButton from '@components/buttons/DarcButton';
import DarkBorderButton from '@components/buttons/DarcBorderButton';

interface IPublicProfileCardProps extends IState, IActions {
  user: IUser;
  isUserLoaded: boolean;
  currentUser: ICurrentUser;
  toggleFollowUser: IBindingCallback1<object>;
  isToggleFollowLoading?: boolean;
}

interface IState {
  achievements: IAchievementToUser[];
}

interface IActions {
  fetchAchievements: IBindingCallback1<string>;
}

const PublicProfileCard: FunctionComponent<IPublicProfileCardProps> = (
  { user, isUserLoaded, currentUser, toggleFollowUser, isToggleFollowLoading, achievements, fetchAchievements }
) => {
  const [userData, setUserData] = useState(user);
  const history = useHistory();

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    if (user.id) {
      fetchAchievements(user.id);
    }
  }, [user.id]);

  const ref = useRef(null);

  const scroll = scrollOffset => {
    ref.current.scrollLeft += scrollOffset;
  }
  const handleFollowUser = () => {
    if (currentUser?.id) {
      toggleFollowUser({ followerId: currentUser.id, followedId: userData.id });
    } else {
      history.push('/login');
    }
  };

  const renderFollowButton = () => {
    if (currentUser.id === userData.id) {
      return null;
    }
    if (userData.followed) {
      return (
        <DarkBorderButton
          content="Unfollow"
          loading={isToggleFollowLoading}
          onClick={handleFollowUser}
        />
      );
    }
    return (
      <DarkButton
        content="Follow"
        className={styles.followBtn}
        loading={isToggleFollowLoading}
        onClick={handleFollowUser}
      />
    );
  };

  return (
    <div className={styles.viewCard}>
      {isUserLoaded ? (
        <div className={styles.contentWrp}>
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
                  {userData.nickname !== null && (
                    <span className={styles.nickname}>
                      {`@${userData.nickname}`}
                    </span>
                  )}
                  <span className={styles.period}>
                    {getHowLong(userData.createdAt)}
                  </span>
                </div>
                {renderFollowButton()}
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
              <div className={styles.statCell}>
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
            <div className={styles.achievementsWrp}>
              <span className={styles.subTitle}>
                Awards
              </span>
              <div className={styles.scrollWpr}>
                <button className={styles.scrollButton} aria-label="scrollLeft" type="button" onClick={() => scroll(-30)}><ScrollLifeSvg /></button>
                <div className={styles.achievements} ref={ref}>
                  {achievements.map(achievement => (
                    <Achievement achievement={achievement} />
                  ))}
                </div>
                <button className={styles.scrollButton} aria-label="scrollRight" type="button" onClick={() => scroll(30)}><ScrollRightSvg /></button>
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

const mapStateToProps: (state) => IState = state => ({
  achievements: state.profilePageReducer.data.achievements
});

const mapDispatchToProps: IActions = {
  fetchAchievements: fetchAchievementsByUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileCard);
