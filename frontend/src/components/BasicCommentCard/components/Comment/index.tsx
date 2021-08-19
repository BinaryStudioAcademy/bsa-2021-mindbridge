import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import React, { FunctionComponent } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;

}

const BasicComment: FunctionComponent<IBasicCommentProps> = ({ createdAt, text, author }) => (
  <div className={styles.basicComment}>
    <div className={styles.commentAuthor}>
      <a href="/" className="avatar">
        <img alt="avatar" src="https://i.imgur.com/LaWyPZF.png" />
      </a>
      <a href="/" className="author">
        {author.lastName}
        {' '}
        {author.lastName}
      </a>
      <DividerSvg />
      <div className="metadata">
        <span className="date">{ moment(createdAt).fromNow() }</span>
      </div>
    </div>
    <div className="content">
      <div className="text">
        { text }
      </div>
    </div>
  </div>
);

export default BasicComment;
