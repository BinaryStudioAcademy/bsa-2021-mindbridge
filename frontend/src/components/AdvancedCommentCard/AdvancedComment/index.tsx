import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import React, { FunctionComponent, useState } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';
import LinkSvg from '@components/AdvancedCommentCard/svg/LinkSvg';
import UpToParentCommentSvg from '@components/AdvancedCommentCard/svg/UpToParentCommentSvg';
import ShareCommentSvg from '@components/AdvancedCommentCard/svg/shareCommentSvg';
import ArrowCloseComment from '@components/AdvancedCommentCard/svg/ArrowCloseComment';
import { ICommentReply } from '@screens/ViewPost/models/ICommentReply';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import RatingComponent from '@screens/ViewPost/components/svgs/RatingIcon';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  commentRating: number;
  setShouldRender: boolean;
  ref: any;
  handle: any;
  shouldRenderArrowCloseComment: boolean;
  sendReply: any;
  userId: string;
  postId: string;
  commentId: string;
  isAuthorized: boolean;
  userInfo: IUserProfile;
  postAuthorId: string;
  parentCommentId: string;
  handleLikeComment: any;
  handleDislikeComment: any;
}

const AdvancedComment: FunctionComponent<IBasicCommentProps> = React.forwardRef((
  {
    userId,
    userInfo,
    postId,
    createdAt,
    text,
    author,
    commentRating,
    setShouldRender,
    ref,
    handle,
    shouldRenderArrowCloseComment,
    sendReply,
    commentId,
    isAuthorized,
    parentCommentId,
    postAuthorId,
    handleLikeComment,
    handleDislikeComment
  }
) => {
  const [disabled, setDisabled] = useState(false);
  const [rotateArrowHook, setRotateArrowHook] = useState(false);
  const [shouldRender] = useState(setShouldRender);

  const rotateArrow = {
    width: '0.7142em',
    height: '0.7142em',
    transform: rotateArrowHook && 'rotate(180deg)',
    transition: 'transform 300ms ease'
  };

  const handleClick = () => {
    handle();
    setRotateArrowHook(!rotateArrowHook);
  };

  const [newReply, setNewReply] = useState<ICommentReply>({
    author: '',
    postId: '',
    replyCommentId: '',
    text: '',
    avatar: null,
    nickname: '',
    rating: 0
  });

  const handleNewReply = (event: any) => {
    setNewReply({
      ...newReply,
      text: event.target.value
    });
  };

  const handleSendReply = () => {
    if (newReply.text.trim().length) {
      const addComment = {
        text: newReply.text,
        author: userId,
        postId,
        replyCommentId: commentId,
        avatar: userInfo.avatar,
        nickname: userInfo.nickname
      };
      sendReply(addComment);
      setDisabled(false);
    }
  };

  const checkAuthorPost = (authorPostId, userID) => authorPostId === userID;

  return (
    <div id={commentId} className={styles.advancedComment}>
      <div className={styles.header}>
        { shouldRenderArrowCloseComment && (
          <button ref={ref} id="button" className={styles.closeCommentBtn} type="button" onClick={() => handleClick()}>
            <div className={styles.arrowClose} style={rotateArrow}><ArrowCloseComment /></div>
          </button>
        )}
        <div className={styles.commentAuthor}>
          <a href={`/user/${author.id}`} className="avatar">
            <img alt="avatar" src={author.avatar ?? 'https://i.imgur.com/LaWyPZF.png'} />
          </a>
          <a
            href={`/user/${author.id}`}
            className={(checkAuthorPost(postAuthorId, author.id)) ? styles.postAuthor : styles.author}
          >
            <p>{author.nickname}</p>
          </a>
          <DividerSvg />
          <div className="metadata">
            <span className="date">{moment(createdAt).fromNow()}</span>
          </div>
        </div>
        <div className={styles.commentRightAction}>
          { userInfo.id !== author.id && (
            <RatingComponent
              postRating={commentRating}
              handleDisLikePost={handleDislikeComment}
              handleLikePost={handleLikeComment}
              postId={commentId}
              userInfo={userInfo}
              arrowUpColor={userInfo.userReactionsComments
                .find(commentReaction => commentReaction.commentId === commentId
                && commentReaction.liked)
                ? ('#8AC858'
                ) : (
                  '#66B9FF'
                )}
              arrowDownColor={userInfo.userReactionsComments
                .find(commentReaction => commentReaction.commentId === commentId
                && !commentReaction.liked)
                ? ('#F75C48'
                ) : (
                  '#66B9FF'
                )}
            />
          )}
          { shouldRender
          && (
          <a href={`#${parentCommentId}`} title="Up to main comment">
            <UpToParentCommentSvg />
          </a>
          )}
          <span>
            <CopyToClipboard text={`localhost:3000/post/${postId}#${commentId}`}>
              <button style={{ background: 'none' }} data-tooltip="Copy link" type="button">
                <LinkSvg />
              </button>
            </CopyToClipboard>
          </span>
          <a href="/" data-tooltip="Share comment">
            <ShareCommentSvg />
          </a>
        </div>
      </div>
      <div className="text">
        {text}
      </div>
      { isAuthorized && (
        <div>
          <div className="actions">
            <DarkBorderButton className={styles.btnReplay} content="Reply" onClick={() => setDisabled(!disabled)} />
          </div>
          {disabled && (
          <div className={styles.replayBlock}>
            <textarea
              value={newReply.text}
              onChange={handleNewReply}
              placeholder="Feel free..."
              className={styles.replyText}
            />

            <div className="actions">
              <DarkBorderButton
                onClick={handleSendReply}
                className={styles.sendCommentBtn}
                content="Send"
              />
            </div>
          </div>
          )}
        </div>
      ) }
    </div>
  );
});

export default AdvancedComment;
