import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { Image } from 'semantic-ui-react';

interface IPostHeaderInformationProps {
  date: string;
  timeRead: string;
  authorName: string;
}

const PostHeaderInformation: FunctionComponent<IPostHeaderInformationProps> = ({ date, timeRead, authorName }) => (
  <div className={styles.postHeaderInfo}>
    <Image src="https://react.semantic-ui.com/images/wireframe/square-image.png" avatar size="big" />
    <span className={styles.userName}>{authorName}</span>
    <DividerSvg />
    <span className={styles.postHeaderInfo}>{date}</span>
    <DividerSvg />
    <span className={styles.postHeaderInfo}>{timeRead}</span>
  </div>
);

export default PostHeaderInformation;
