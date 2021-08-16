import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { Image } from 'semantic-ui-react';

interface IPostHeaderInformationProps {
  date: string;
  timeRead: string;
  authorName: string;
  avatar: string;
}

const PostHeaderInformation: FunctionComponent<IPostHeaderInformationProps> = ({ date, timeRead,
  authorName, avatar }) => (
    <div className={styles.postHeaderInfo}>
      {avatar === null ? (
        <Image
          src="https://i.imgur.com/LaWyPZF.png"
          avatar
          size="big"
        />
      ) : (
        <Image
          src={avatar}
          avatar
          size="big"
        />
      )}
      <span className={styles.userName}>{authorName}</span>
      <DividerSvg />
      <span className={styles.postHeaderInfo}>{date}</span>
      <DividerSvg />
      <span className={styles.postHeaderInfo}>{timeRead}</span>
    </div>
);

export default PostHeaderInformation;
