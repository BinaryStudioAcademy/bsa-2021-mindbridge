import React, { useRef, useState } from 'react';
import { IComments } from '@screens/ViewPost/models/IComments';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import AdvancedComment from '@components/AdvancedCommentCard/AdvancedComment';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { Comment } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';

interface ICommentProps {
  text: string;
  author: IUser;
  replies: IComments[];
  createdAt: string;
  commentRating: number;
  shouldRenderUpToParent: boolean;
  shouldRenderArrowCloseComment: boolean;
  sendComment: any;
  postId: string;
  commentId: string;
  sendReply: any;
  isAuthorized: boolean;
  userInfo: IUserProfile;
  shouldRenderBorder: boolean;
  parentCommentId: string;
  postAuthorId: string;
  handleLikeComment: any;
  handleDislikeComment: any;
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
    handleDislikeComment
  }
) => {
  const closeCommentRef = useRef(true);
  const [isOpened, setIsOpened] = useState(closeCommentRef.current);

  const handleIsOpenedComment = () => {
    setIsOpened(!isOpened);
  };

  const repliesLength = replies.length > 0;

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
      />
      {repliesLength && (
        <div >
          { isOpened && (
            <div className="comments">
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
