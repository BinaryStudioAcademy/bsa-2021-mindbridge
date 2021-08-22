import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import { IComment } from '@screens/ViewPost/models/IComment';
import Reply from '@components/BasicCommentCard/components/Reply';

interface ICommentProps {
  comments: IComment[];
}

const CommentsFeed: FunctionComponent<ICommentProps> = ({ comments }) => (
  <div className={styles.main}>
    <p className={styles.commentCounter}>
      {' '}
      Discussion (
      {comments.length}
      )
      {' '}
    </p>
    <form className="ui reply form">
      <div className="field">
        <textarea placeholder="Add to the discussion..." />
      </div>
      <DarkBorderButton className={styles.buttonSend} content="Send" />
    </form>
    <div className="ui comments">
      <div className="comment">
        {comments.map(comment => (
          <Reply
            createdAt={comment.createdAt}
            text={comment.text}
            author={comment.author}
            commentRating={comment.rating}
          />
        ))}
      </div>
    </div>
  </div>
);

export default CommentsFeed;
