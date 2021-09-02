import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import React, { FunctionComponent } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';
import Image from '@components/Image';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;
}

const BasicComment: FunctionComponent<IBasicCommentProps> = ({ createdAt, text, author }) => (
  <div className={styles.basicComment}>
    <div className={styles.header}>
      <div className={styles.commentAuthor}>
        <a href="/" className="avatar">
          <Image alt="avatar" src={author.avatar ?? 'https://i.imgur.com/LaWyPZF.png'} />
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
