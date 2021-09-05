import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import React, { FunctionComponent } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;
}

const BasicComment: FunctionComponent<IBasicCommentProps> = ({
  createdAt,
  text,
  author
}) => (
  <div className={styles.basicComment}>
    <div className={styles.header}>
      <div className={styles.commentAuthor}>
        <a href={`/user/${author.id}`} className="avatar">
          <Image alt="avatar" src={author.avatar ?? defaultAvatar} />
        </a>
        <a href={`/user/${author.id}`} className="author">
          {author.nickname}
        </a>
        <DividerSvg />
        <div className="metadata">
          <span className="date">{moment(createdAt).fromNow()}</span>
        </div>
      </div>
    </div>
    <div className="text">
      {text}
    </div>
  </div>
);

export default BasicComment;
