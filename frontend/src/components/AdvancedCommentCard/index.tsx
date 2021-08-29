import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import { IComments } from '@screens/ViewPost/models/IComments';
import Reply from '@components/AdvancedCommentCard/Reply';
import { IComment } from '@screens/ViewPost/models/IComment';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { IBindingCallback1 } from '@models/Callbacks';

interface ICommentProps {
  comments: IComments[];
  sendComment: IBindingCallback1<object>;
  sendReply: IBindingCallback1<object>;
  userInfo: IUserProfile;
  postId: string;
  isAuthorized: boolean;
  postAuthorId: string;
  handleLikeComment: IBindingCallback1<string>;
  handleDislikeComment: IBindingCallback1<string>;
}

const AdvancedCommentsFeed: FunctionComponent<ICommentProps> = (
  {
    comments,
    sendComment,
    userInfo,
    postId,
    sendReply,
    isAuthorized,
    postAuthorId,
    handleLikeComment,
    handleDislikeComment
  }
) => {
  const [newComment, setNewComment] = useState<IComment>({
    text: '',
    author: '',
    postId: '',
    avatar: null,
    nickname: '',
    rating: 0
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
        author: userInfo.id,
        postId,
        avatar: userInfo.avatar,
        nickname: userInfo.nickname
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
          <div className={styles.nonAuthorizedHeading}>
            <p>
              You must be
              {' '}
              <a href="/login">logged in</a>
              {' '}
              to post or reply a comment.
            </p>
          </div>
        )}
      <div>
        <div className="ui comments">
          <div className="comment">
            {comments.map(comment => (
              <Reply
                postAuthorId={postAuthorId}
                createdAt={comment.createdAt}
                text={comment.text}
                author={comment.author}
                replies={comment.comments}
                commentRating={comment.rating}
                shouldRenderUpToParent={false}
                shouldRenderArrowCloseComment={comment.comments.length > 0}
                sendComment={sendComment}
                postId={postId}
                commentId={comment.id}
                sendReply={sendReply}
                isAuthorized={isAuthorized}
                userInfo={userInfo}
                shouldRenderBorder
                parentCommentId={comment.id}
                handleDislikeComment={handleDislikeComment}
                handleLikeComment={handleLikeComment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCommentsFeed;