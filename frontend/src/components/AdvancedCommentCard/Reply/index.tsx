import React, { useEffect, useRef, useState } from 'react';
import { IComment } from '@screens/ViewPost/models/IComment';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import AdvancedComment from '@components/AdvancedCommentCard/AdvancedComment';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import ArrowCloseComment from '@components/AdvancedCommentCard/svg/ArrowCloseComment';
import { Collapse } from 'react-collapse';

interface ICommentProps {
  text: string;
  author: IUser;
  replies: IComment[];
  createdAt: string;
  commentRating: number;
  shouldRenderUpToParent: boolean;
  shouldRenderArrowCloseComment: boolean;
}

const Reply: React.FC<ICommentProps> = (
  {
    text,
    author,
    replies,
    createdAt,
    commentRating,
    shouldRenderUpToParent,
    shouldRenderArrowCloseComment
  }
) => {
  const closeCommentRef = useRef(true);
  const [isOpened, setIsOpened] = useState(closeCommentRef.current);

  const handle = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className={styles.comment}>
      <AdvancedComment
        createdAt={createdAt}
        text={text}
        author={author}
        commentRating={commentRating}
        setShouldRender={shouldRenderUpToParent}
        ref={closeCommentRef}
        handle={handle}
        shouldRenderArrowCloseComment={shouldRenderArrowCloseComment}
      />
      {replies.length > 0 && (
        <Collapse isOpened={isOpened}>
          <div className="comments">
            {replies.map(comment => (
              <Reply
                replies={comment.comments}
                author={comment.author}
                createdAt={comment.createdAt}
                text={comment.text}
                commentRating={comment.rating}
                shouldRenderUpToParent={!(replies.length === 0)}
                shouldRenderArrowCloseComment={(replies.length === 0)}
              />
            ))}
          </div>
        </Collapse>
      )}
    </div>
  );
};

export default Reply;
