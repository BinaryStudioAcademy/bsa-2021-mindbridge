import React, { useState } from 'react';
import { IComment } from '@screens/ViewPost/models/IComment';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import AdvancedComment from '@components/AdvancedCommentCard/AdvancedComment';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import ArrowCloseComment from '@components/AdvancedCommentCard/svg/ArrowCloseComment';
import { Collapse } from 'react-collapse';

interface ICommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  replies: IComment[];
  commentRating: number;
  shouldRender: boolean;
}

const Reply: React.FC<ICommentProps> = (
  { author, createdAt, text, replies, commentRating, shouldRender }
) => {
  const [disabled, setDisabled] = useState(false);

  const style = {
    transform: disabled ? 'rotate(-90deg)' : '',
    transition: 'transform 300ms ease'
  };

  return (
    <div className={styles.comment}>
      {replies.length > 0 ? (
        <button id="button" className={styles.inputBtn} type="button" onClick={() => setDisabled(!disabled)}>
          <div style={style}><ArrowCloseComment /></div>
        </button>
      ) : (<div style={{ display: 'none' }} />)}
      <AdvancedComment
        createdAt={createdAt}
        text={text}
        author={author}
        commentRating={commentRating}
        setShouldRender={shouldRender}
      />
      {replies.length > 0 ? (
        <Collapse isOpened={!disabled}>
          <div className="comments">
            {replies.map(comment => (
              <Reply
                replies={comment.comments}
                author={comment.author}
                createdAt={comment.createdAt}
                text={comment.text}
                commentRating={comment.rating}
                shouldRender={!(replies.length === 0)}
              />
            ))}
          </div>
        </Collapse>
      ) : (<div style={{ display: 'none' }} />)}
    </div>
  );
};

export default Reply;
