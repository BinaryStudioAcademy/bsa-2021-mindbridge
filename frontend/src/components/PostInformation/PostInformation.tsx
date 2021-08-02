import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Image } from 'semantic-ui-react';

interface IPostInformationProps {
  date: string;
  author: string;
  timeRead: string;
}

const PostInformation: FunctionComponent<IPostInformationProps> = ({ author, date, timeRead }) => (
  <div className={styles.postHeaderInfo}>
    <Image src="https://react.semantic-ui.com/images/wireframe/square-image.png" avatar size="large" />
    <span className={styles.userName}>
      { author }
    </span>
    <button className={styles.btnFollow}><p>Follow</p></button>
    <svg
      className={styles.divider}
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.777 3.758C0.777 3.28667 0.865667 2.84333 1.043 2.428C1.225 2.01267 1.47 1.651 1.778 1.343C2.086
                1.035 2.44767 0.792333 2.863 0.615C3.27833 0.432999 3.72167 0.341999 4.193 0.341999C4.66433
                0.341999 5.10767
                0.432999 5.523 0.615C5.93833 0.792333 6.3 1.035 6.608 1.343C6.92067 1.651 7.16567 2.01267 7.343
                2.428C7.525 2.84333 7.616 3.28667 7.616 3.758C7.616 4.234 7.525 4.67967 7.343 5.095C7.16567 5.51033
                6.92067 5.872 6.608 6.18C6.3 6.488 5.93833 6.733 5.523 6.915C5.10767 7.09233 4.66433 7.181 4.193
                7.181C3.72167 7.181 3.27833 7.09233 2.863 6.915C2.44767 6.733 2.086 6.488 1.778 6.18C1.47 5.872 1.225
                5.51033 1.043 5.095C0.865667 4.67967 0.777 4.234 0.777 3.758Z"
        fill="#66B9FF"
      />
    </svg>
    <span className={styles.postHeaderInfo}>
      { date }
    </span>

    <svg
      className={styles.divider}
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.777 3.758C0.777 3.28667 0.865667 2.84333 1.043 2.428C1.225 2.01267 1.47 1.651 1.778 1.343C2.086
                1.035 2.44767 0.792333 2.863 0.615C3.27833 0.432999 3.72167 0.341999 4.193 0.341999C4.66433
                0.341999 5.10767
                0.432999 5.523 0.615C5.93833 0.792333 6.3 1.035 6.608 1.343C6.92067 1.651 7.16567 2.01267 7.343
                2.428C7.525 2.84333 7.616 3.28667 7.616 3.758C7.616 4.234 7.525 4.67967 7.343 5.095C7.16567 5.51033
                6.92067 5.872 6.608 6.18C6.3 6.488 5.93833 6.733 5.523 6.915C5.10767 7.09233 4.66433 7.181 4.193
                7.181C3.72167 7.181 3.27833 7.09233 2.863 6.915C2.44767 6.733 2.086 6.488 1.778 6.18C1.47 5.872 1.225
                5.51033 1.043 5.095C0.865667 4.67967 0.777 4.234 0.777 3.758Z"
        fill="#66B9FF"
      />
    </svg>
    <span className={styles.postHeaderInfo}>
      {timeRead}
    </span>
  </div>
);

export default PostInformation;
