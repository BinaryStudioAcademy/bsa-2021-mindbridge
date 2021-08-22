import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import { IComment } from '@screens/ViewPost/models/IComment';
import Reply from '@components/AdvancedCommentCard/Reply';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';

interface ICommentProps {
  comments: IComment[];

}

const AdvancedCommentsFeed: FunctionComponent<ICommentProps> = (
  { comments }
) => (
  <div className={styles.advancedCommentFeed}>
    <p className={styles.commentCounter}>
      Discussion (
      {comments.length}
      )
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
            key={comment.id}
            createdAt={comment.createdAt}
            text={comment.text}
            author={comment.author}
            replies={comment.comments}
            commentRating={comment.rating}
          />
        ))}
      </div>
    </div>
  </div>
);

export default AdvancedCommentsFeed;
