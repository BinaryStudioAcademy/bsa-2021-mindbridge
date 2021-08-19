import React, { FunctionComponent } from 'react';
import { IComment } from '@screens/ViewPost/models/IComment';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import BasicComment from '@components/BasicCommentCard/components/Comment';

interface ICommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  replies: IComment[];
  commentRating: number;
}

const Reply: FunctionComponent<ICommentProps> = ({ author, createdAt, text, replies, commentRating }) => (
  <div className={styles.comment}>
    <BasicComment createdAt={createdAt} text={text} author={author} />
    <div className="comments">
      {replies.map(comment => (
        <Reply
          replies={comment.comments}
          author={comment.author}
          createdAt={comment.createdAt}
          text={comment.text}
          commentRating={comment.rating}
        />
      ))}
    </div>
  </div>
);

export default Reply;
