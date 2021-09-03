import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { Link } from 'react-router-dom';
import Image from '@components/Image';
import {defaultAvatar} from "@images/defaultImages";

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
        <Image src={avatar ?? defaultAvatar} />
        <span className={styles.userName}>{authorName}</span>
      </Link>
      <DividerSvg />
      <span className={styles.postHeaderInfo}>{date}</span>
      <DividerSvg />
      <span className={styles.postHeaderInfo}>{timeRead}</span>
    </div>
);

export default PostHeaderInformation;
