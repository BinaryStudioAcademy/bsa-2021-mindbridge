import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Image } from 'semantic-ui-react';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import FollowBtn from '@screens/ViewPost/components/Button/FollowBtn/FollowBtn';
import { timeToLocal } from '@helpers/dataTimeToLocalData';

interface IPostInformationProps {
  date: string;
  author: string;
}

const PostInformation: FunctionComponent<IPostInformationProps> = ({ author, date }) => (
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
      { timeToLocal(date) }
    </span>
    <DividerSvg />
    <span className={styles.additionalInformation}>
      7 min
    </span>
  </div>
);

export default PostInformation;
