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
}

const Reply: FunctionComponent<ICommentProps> = ({ author, createdAt, text, replies }) => (
  <div className={styles.comment}>
    <BasicComment createdAt={createdAt} text={text} author={author} />
    <div className="comments">
      {replies.map(e => (
        <Reply
          replies={e.comments}
          author={e.author}
          createdAt={e.createdAt}
          text={e.text}
        />
      ))}
    </div>
  </div>
);

export default Reply;
