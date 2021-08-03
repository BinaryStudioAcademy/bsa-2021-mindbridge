import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Image } from 'semantic-ui-react';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import FollowBtn from '@screens/ViewPost/components/Button/FollowBtn/FollowBtn';

interface IPostInformationProps {
  date: string;
  author: string;
  timeRead: string;
}

const PostInformation: FunctionComponent<IPostInformationProps> = ({ author, date, timeRead }) => (
  <div className={styles.postHeaderInfo}>
    <div className={styles.userBlock}>
      <Image src="https://react.semantic-ui.com/images/wireframe/square-image.png" avatar size="big" />
      <span className={styles.userName}>
        { author }
      </span>
    </div>
    <FollowBtn />
    <DividerSvg />
    <span className={styles.additionalInformation}>
      { date }
    </span>
    <DividerSvg />
    <span className={styles.additionalInformation}>
      {timeRead}
    </span>
  </div>
);

export default PostInformation;
