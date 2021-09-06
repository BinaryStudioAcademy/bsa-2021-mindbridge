import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import { IComments } from '@screens/ViewPost/models/IComments';
import Reply from '@components/AdvancedCommentCard/Reply';
import { IComment } from '@screens/ViewPost/models/IComment';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';
import DarkButton from '@components/buttons/DarcButton';

interface ICommentProps {
  comments: IComments[];
  sendComment: any;
  sendReply: any;
  userInfo: IUserProfile;
  postId: string;
  isAuthorized: boolean;
  postAuthorId: string;
  handleLikeComment: any;
  handleDislikeComment: any;
  searchUsersByNickname: any;
  users: IMentionsUser[];
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
    handleDislikeComment,
    searchUsersByNickname,
    users
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
        text: newComment.text.replace(/<(.+?)>/g, '&lt;$1&gt;'),
        author: userInfo.id,
        postId,
        avatar: userInfo.avatar,
        nickname: userInfo.nickname
      };
      sendComment(addComment);
    }
  };

  function getMaximumCommentsFoldCount(commentsDepth, foldCount = 0) {
    return commentsDepth.reduce((count, item) => {
      // eslint-disable-next-line no-prototype-builtins
      if (item.hasOwnProperty('comments')) {
        // eslint-disable-next-line no-param-reassign
        count = Math.max(
          count,
          // eslint-disable-next-line no-param-reassign,no-plusplus
          getMaximumCommentsFoldCount(item.comments, ++foldCount)
        );
      }
      return count;
    }, foldCount);
  }

  return (
    <div className={styles.advancedCommentFeed}>
      <p className={styles.commentCounter}>
        Discussion (
        {getMaximumCommentsFoldCount(comments)}
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
          <DarkButton
            disabled={!newComment.text}
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
                depthOfComments={0}
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
                commentProp={comment}
                sendReply={sendReply}
                isAuthorized={isAuthorized}
                userInfo={userInfo}
                shouldRenderBorder
                parentCommentId={comment.id}
                handleDislikeComment={handleDislikeComment}
                handleLikeComment={handleLikeComment}
                users={users}
                searchUsersByNickname={searchUsersByNickname}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCommentsFeed;
