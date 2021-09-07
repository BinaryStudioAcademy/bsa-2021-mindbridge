import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import React, { FunctionComponent } from 'react';
import moment from 'moment';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import { ICommentAuthor } from '@screens/ViewPost/models/ICommentAuthor';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: ICommentAuthor;
}

const BasicComment: FunctionComponent<IBasicCommentProps> = ({ createdAt, text, author }) => (
  <div className={styles.basicComment}>
    <div className={styles.header}>
      <div className={styles.commentAuthor}>
        <a href="/" className="avatar">
          <Image alt="avatar" src={author.avatar ?? defaultAvatar} />
        </a>
        <a href="/" className="author">
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
