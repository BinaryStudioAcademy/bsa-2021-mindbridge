import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import FollowBtn from '@screens/ViewPost/components/Button/FollowBtn/FollowBtn';
import { timeToLocal } from '@helpers/dataTimeToLocalData';
import DraftLabel from '@components/DraftLabel';
import { IUser } from '@screens/ViewPost/models/IUser';
import UserInfoPopup from '@screens/ViewPost/components/Popups/UserInfoPopup';

interface IPostInformationProps {
  author: IUser;
  date: string;
  readTime: string;
  draft: boolean;
}

const PostInformation: FunctionComponent<IPostInformationProps> = (
  { author,
    date,
    draft,
    readTime
  }
) => (
  <div className={styles.postHeaderInfo}>
    <UserInfoPopup author={author} />
    <DividerSvg />
    <span className={styles.additionalInformation}>
      { timeToLocal(date) }
    </span>
    <DividerSvg />
    <span className={styles.additionalInformation}>
      {readTime}
    </span>
    {draft && [
      <DividerSvg />,
      <DraftLabel />
    ]}
  </div>
);

export default PostInformation;
