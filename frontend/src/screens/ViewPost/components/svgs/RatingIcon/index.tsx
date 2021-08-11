import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface IRatingIconProps {
  postRating: number;
}

const RatingComponent: FunctionComponent<IRatingIconProps> = ({ postRating }) => (
  <div className={styles.ratingElement}>
    <svg
      className={styles.arrowUp}
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M10 5L5 -4.37114e-07L0 5L10 5Z" />
    </svg>
    <div className={styles.ratingNumber}>
      <span>{postRating}</span>
    </div>
    <svg
      className={styles.arrowDown}
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0L5 5L10 0L0 0Z" />
    </svg>
  </div>
);

export default RatingComponent;
