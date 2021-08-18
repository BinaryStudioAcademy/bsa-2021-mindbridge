import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import React, { FunctionComponent } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';
import { IComment } from '@screens/ViewPost/models/IComment';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  commentData: IComment[];
}

const BasicComment: FunctionComponent<IBasicCommentProps> = ({ commentData, createdAt, text, author }) => (
  <div className="comment">
    <div className={styles.commentInfo}>
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
      <div className="actions">
        <DarkBorderButton className={styles.btnReplay} content="Replay" />
      </div>
    </div>
  </div>
);

export default BasicComment;
