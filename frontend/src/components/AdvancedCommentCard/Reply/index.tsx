import React, { useRef, useState } from 'react';
import { IComments } from '@screens/ViewPost/models/IComments';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import AdvancedComment from '@components/AdvancedCommentCard/AdvancedComment';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';
import { ICommentAuthor } from '@screens/ViewPost/models/ICommentAuthor';
import { IBindingAction } from '@models/Callbacks';

interface ICommentProps {
  text: string;
  author: ICommentAuthor;
  replies: IComments[];
  createdAt: string;
  commentRating: number;
  shouldRenderUpToParent: boolean;
  shouldRenderArrowCloseComment: boolean;
  postId: string;
  commentId: string;
  sendComment: any;
  sendReply: any;
  isAuthorized: boolean;
  userInfo: IUserProfile;
  shouldRenderBorder: boolean;
  parentCommentId: string;
  postAuthorId: string;
  handleLikeComment: any;
  handleDislikeComment: any;
  depthOfComments: number;
  searchUsersByNickname: any;
  users: IMentionsUser[];
  editComment: any;
  updatedAt: string;
  commentProp: IComments;
  resetSendingComment: IBindingAction;
  sendingEditComment: boolean;
}

const Reply: React.FC<ICommentProps> = (
  {
    commentId,
    shouldRenderBorder,
    userInfo,
    postId,
    text,
    sendComment,
    author,
    replies,
    createdAt,
    commentRating,
    shouldRenderUpToParent,
    shouldRenderArrowCloseComment,
    sendReply,
    isAuthorized,
    parentCommentId,
    postAuthorId,
    handleLikeComment,
    handleDislikeComment,
    depthOfComments,
    searchUsersByNickname,
    users,
    editComment,
    updatedAt,
    commentProp,
    resetSendingComment,
    sendingEditComment
  }
) => {
  const closeCommentRef = useRef(true);
  const [isOpened, setIsOpened] = useState(closeCommentRef.current);

  const handleIsOpenedComment = () => {
    setIsOpened(!isOpened);
  };

  const repliesLength = replies.length > 0;

  const isMaxDepthOfComments = depthOfComments > 6;

  return (
    <div className={shouldRenderBorder && styles.comment}>
      <AdvancedComment
        createdAt={createdAt}
        text={text}
        author={author}
        commentRating={commentRating}
        setShouldRender={shouldRenderUpToParent}
        ref={closeCommentRef}
        handleIsOpenedComment={handleIsOpenedComment}
        shouldRenderArrowCloseComment={shouldRenderArrowCloseComment}
        sendReply={sendReply}
        postId={postId}
        commentId={commentId}
        isAuthorized={isAuthorized}
        userInfo={userInfo}
        parentCommentId={parentCommentId}
        postAuthorId={postAuthorId}
        handleLikeComment={handleLikeComment}
        handleDislikeComment={handleDislikeComment}
        users={users}
        comment={commentProp}
        searchUsersByNickname={searchUsersByNickname}
        editComment={editComment}
        updatedAt={updatedAt}
        resetSendingComment={resetSendingComment}
        sendingEditComment={sendingEditComment}
      />
      {repliesLength && (
        <div className={!isMaxDepthOfComments && styles.leftBorder}>
          { isOpened && (
            <div className={!isMaxDepthOfComments && styles.commentsWithMargin}>
                {replies.map(comment => (
                  <Reply
                    replies={comment.comments}
                    author={comment.author}
                    createdAt={comment.createdAt}
                    text={comment.text}
                    commentRating={comment.rating}
                    shouldRenderUpToParent={repliesLength}
                    shouldRenderArrowCloseComment={(comment.comments.length > 0)}
                    postId={postId}
                    sendComment={sendComment}
                    commentId={comment.id}
                    sendReply={sendReply}
                    isAuthorized={isAuthorized}
                    userInfo={userInfo}
                    shouldRenderBorder={false}
                    parentCommentId={parentCommentId}
                    postAuthorId={postAuthorId}
                    handleDislikeComment={handleDislikeComment}
                    handleLikeComment={handleLikeComment}
                    depthOfComments={depthOfComments + 1}
                    users={users}
                    commentProp={comment}
                    searchUsersByNickname={searchUsersByNickname}
                    editComment={editComment}
                    updatedAt={comment.updatedAt}
                    resetSendingComment={resetSendingComment}
                    sendingEditComment={sendingEditComment}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reply;
