import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import { IComments } from '@screens/ViewPost/models/IComments';
import Reply from '@components/AdvancedCommentCard/Reply';
import { IComment } from '@screens/ViewPost/models/IComment';

interface ICommentProps {
  comments: IComments[];
  sendComment: any;
  userId: string;
  postId: string;
  sendReply: any;
  isAuthorized: boolean;
}

const AdvancedCommentsFeed: FunctionComponent<ICommentProps> = (
  {
    comments,
    sendComment,
    userId,
    postId,
    sendReply,
    isAuthorized
  }
) => {
  const [newComment, setNewComment] = useState<IComment>({
    text: '',
    author: '',
    postId: ''
  });

  const handleNewComment = (event: any) => {
    setNewComment({
      ...newComment,
      text: event.target.value
    });
  };

  const handleSendComment = () => {
    if (newComment.text.trim().length) {
      const addComment = {
        text: newComment.text,
        author: userId,
        postId
      };
      sendComment(addComment);
    }
  };

  return (
    <div className={styles.advancedCommentFeed}>
      <p className={styles.commentCounter}>
        Discussion (
        {comments.length}
        )
      </p>
      {isAuthorized ? (
        <form className="ui reply form">
          <div className="field">
            <textarea
              value={newComment.text}
              onChange={handleNewComment}
              placeholder="Add to the discussion..."
            />
          </div>
          <DarkBorderButton
            onClick={handleSendComment}
            className={styles.buttonSend}
            content="Send"
          />
        </form>
      ) : (
        <div>
          <h5>You must be logged in to post a comment.</h5>
        </div>
      )}
      <div className="ui comments">
        <div className="comment">
          {comments.map(comment => (
            <Reply
              createdAt={comment.createdAt}
              text={comment.text}
              author={comment.author}
              replies={comment.comments}
              commentRating={comment.rating}
              shouldRenderUpToParent={false}
              shouldRenderArrowCloseComment={(comment.comments.length > 0)}
              sendComment={sendComment}
              userId={userId}
              postId={postId}
              commentId={comment.id}
              sendReply={sendReply}
              isAuthorized={isAuthorized}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedCommentsFeed;
