import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Image } from 'semantic-ui-react';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import FollowBtn from '@screens/ViewPost/components/Button/FollowBtn/FollowBtn';
import { timeToLocal } from '@helpers/dataTimeToLocalData';
import { Link } from 'react-router-dom';

interface IPostInformationProps {
  id: string;
  date: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const PostInformation: FunctionComponent<IPostInformationProps> = ({ id, firstName, lastName, date, avatar }) => (
  <div className={styles.postHeaderInfo}>
    <Link to={`/user/${id}`}>
      <div className={styles.userBlock}>
        <Image src={avatar ?? 'https://i.imgur.com/LaWyPZF.png'} avatar size="big" />
        <div className={styles.userName}>
          { firstName }
          {' '}
          { lastName }
        </div>
      </div>
    </Link>
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
