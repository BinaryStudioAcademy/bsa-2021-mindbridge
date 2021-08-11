import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Image } from 'semantic-ui-react';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import FollowBtn from '@screens/ViewPost/components/Button/FollowBtn/FollowBtn';
import { timeToLocal } from '@helpers/dataTimeToLocalData';

interface IPostInformationProps {
  date: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const PostInformation: FunctionComponent<IPostInformationProps> = ({ firstName, lastName, date, avatar }) => (
  <div className={styles.postHeaderInfo}>
    <div className={styles.userBlock}>
      <Image src={avatar} avatar size="big" />
      <div className={styles.userName}>
        { firstName }
        {' '}
        { lastName }
      </div>
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
