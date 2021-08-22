import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface IPostHeaderInformationProps {
  authorId: string;
  date: string;
  timeRead: string;
  authorName: string;
  avatar: string;
}

const PostHeaderInformation: FunctionComponent<IPostHeaderInformationProps> = ({ authorId, date, timeRead,
  authorName, avatar }) => (
    <div className={styles.postHeaderInfo}>
      <Link to={`/user/${authorId}`}>
        <Image
          src={avatar ?? 'https://i.imgur.com/LaWyPZF.png'}
          avatar
          size="big"
        />
        <span className={styles.userName}>{authorName}</span>
      </Link>
      <DividerSvg />
      <span className={styles.postHeaderInfo}>{date}</span>
      <DividerSvg />
      <span className={styles.postHeaderInfo}>{timeRead}</span>
    </div>
);

export default PostHeaderInformation;
