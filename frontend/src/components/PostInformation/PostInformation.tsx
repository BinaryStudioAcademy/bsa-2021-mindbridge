import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Image } from 'semantic-ui-react';
import DividerSvg from '@components/SvgComponents/dividerSvg';
import FollowBtn from '@components/Button/FollowBtn/FollowBtn';

interface IPostInformationProps {
  date: string;
  author: string;
  timeRead: string;
}

const PostInformation: FunctionComponent<IPostInformationProps> = ({ author, date, timeRead }) => (
  <div className={styles.postHeaderInfo}>
    <Image src="https://react.semantic-ui.com/images/wireframe/square-image.png" avatar size="big" />
    <span className={styles.userName}>
      { author }
    </span>
    <FollowBtn />
    <DividerSvg />
    <span className={styles.postHeaderInfo}>
      { date }
    </span>
    <DividerSvg />
    <span className={styles.postHeaderInfo}>
      {timeRead}
    </span>
  </div>
);

export default PostInformation;
