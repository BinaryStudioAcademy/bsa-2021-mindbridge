import React, { FunctionComponent } from 'react';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import { IComment } from '@screens/ViewPost/models/IComment';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import moment from 'moment';

interface ICommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  commentData: IComment[];
}

/* eslint-disable jsx-a11y/alt-text */
const CommentWithReplay: FunctionComponent<ICommentProps> = ({ author, createdAt, text, commentData }) => (
  <div className="comment">
    <div className={styles.commentInfo}>
      <a href="/" className="avatar">
        <img src="https://i.imgur.com/LaWyPZF.png" />
      </a>
      <a href="/" className="author">
        {author.lastName}
        {' '}
        {author.lastName}
      </a>
      <DividerSvg />
      <div className="metadata">
        <span className="date">{moment(createdAt).fromNow()}</span>
      </div>
    </div>
    <div className="content">
      <div className="text">
        {text}
      </div>
      <div className="actions">
        <DarkBorderButton className={styles.btnReplay} content="Reply" />
      </div>
    </div>
    <div className="comments">
      <div className={styles.noBorder}>
        <div className="comment">
          {commentData.map(e => (
            <CommentWithReplay commentData={e.comments} author={e.author} createdAt={e.createdAt} text={e.text} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default CommentWithReplay;
