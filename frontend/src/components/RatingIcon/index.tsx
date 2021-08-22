import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';

interface IRatingIconProps {
  postRating: number;
  handleLikePost: any;
  handleDisLikePost: any;
  postId: string;
  userInfo: IUserProfile;
  arrowUpColor: string;
  arrowDownColor: string;
}
const RatingComponent: FunctionComponent<IRatingIconProps> = ({ postRating, handleLikePost, handleDisLikePost,
  postId, arrowUpColor, arrowDownColor }) => {
  const likePost = () => {
    handleLikePost(postId);
  };
  const disLikePost = () => {
    handleDisLikePost(postId);
  };
  return (
    <div className={styles.ratingElement}>
      <svg
        onClick={likePost}
        className={styles.arrowUp}
        width="13"
        height="8"
        viewBox="0 0 10 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={arrowUpColor} clipRule="evenodd" d="M10 5L5 -4.37114e-07L0 5L10 5Z" />
      </svg>
      <div className={styles.ratingNumber}>
        <span>{postRating}</span>
      </div>
      <svg
        onClick={disLikePost}
        className={styles.arrowDown}
        width="13"
        height="8"
        viewBox="0 0 10 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={arrowDownColor} clipRule="evenodd" d="M0 0L5 5L10 0L0 0Z" />
      </svg>
    </div>
  );
};

export default RatingComponent;
