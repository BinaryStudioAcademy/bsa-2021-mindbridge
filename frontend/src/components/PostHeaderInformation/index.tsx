import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { IFeedAuthor } from '@screens/FeedPage/models/IFeedAuthor';
import UserInfoPopup from '@screens/ViewPost/components/Popups/UserInfoPopup';

interface IPostHeaderInformationProps {
  author: IFeedAuthor;
  date: string;
  timeRead: string;
}

const PostHeaderInformation: FunctionComponent<IPostHeaderInformationProps> = ({ author, date, timeRead }) => (
  <div className={styles.postHeaderInfo}>
    <UserInfoPopup author={author} />
    <DividerSvg />
    <span className={styles.postHeaderInfo}>{date}</span>
    <DividerSvg />
    <span className={styles.postHeaderInfo}>{timeRead}</span>
  </div>
);

export default PostHeaderInformation;
