import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import { IComments } from '@screens/ViewPost/models/IComments';
import Reply from '@components/AdvancedCommentCard/Reply';
import { IComment } from '@screens/ViewPost/models/IComment';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';
import classNames from '@components/AdvancedCommentCard/mentition/styles.module.scss';
import { useDebouncedCallback } from 'use-debounce';
import { MentionsInput, Mention } from 'react-mentions';
import AsyncUserMentions from '@components/AdvancedCommentCard/mentition/mentition';

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
  users: any;
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
        <div className={styles.commentInput}>
          <AsyncUserMentions
            isReply={false}
            userInfo={userInfo}
            sendComment={sendComment}
            postId={postId}
            searchUsersByNickname={searchUsersByNickname}
            users={users}
          />
        </div>
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
