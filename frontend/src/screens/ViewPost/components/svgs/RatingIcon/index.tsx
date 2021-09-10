import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';

interface IRatingIconProps {
  postRating: number;
  handleLikePost: any;
  handleDisLikePost: any;
  post: any;
  userInfo: IUserProfile;
  arrowUpColor: string;
  arrowDownColor: string;
  isAuthor?: boolean;
}
const RatingComponent: FunctionComponent<IRatingIconProps> = ({ postRating, handleLikePost, handleDisLikePost,
  post, arrowUpColor, arrowDownColor, userInfo }) => {
  const likePost = () => {
    handleLikePost(post.id);
  };
  const disLikePost = () => {
    handleDisLikePost(post.id);
  };
  return (
    <div className={styles.ratingElement}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className={styles.ratingArrowUp} onClick={likePost}>
        <svg
          className={styles.arrowUp}
          width="10"
          height="5"
          viewBox="0 0 10 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={arrowUpColor}
            clipRule="evenodd"
            d="M10 5L5 -4.37114e-07L0 5L10 5Z"
          />
        </svg>
      </div>
      <div className={styles.ratingNumber}>
        <span>{postRating}</span>
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className={styles.ratingArrowDown} onClick={disLikePost}>
        <svg
          className={styles.arrowDown}
          width="10"
          height="5"
          viewBox="0 0 10 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={arrowDownColor}
            clipRule="evenodd"
            d="M0 0L5 5L10 0L0 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default RatingComponent;
