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
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import { IBindingCallback1 } from '@models/Callbacks';
import { Popup } from 'semantic-ui-react';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  commentRating: number;
  setShouldRender: boolean;
  ref: any;
  handleIsOpenedComment: any;
  shouldRenderArrowCloseComment: boolean;
  sendReply: IBindingCallback1<object>;
  postId: string;
  commentId: string;
  isAuthorized: boolean;
  userInfo: IUserProfile;
  postAuthorId: string;
  parentCommentId: string;
  handleLikeComment: IBindingCallback1<string>;
  handleDislikeComment: IBindingCallback1<string>;
}

const AdvancedComment: FunctionComponent<IBasicCommentProps> = React.forwardRef((
  {
    userInfo,
    postId,
    createdAt,
    text,
    author,
    commentRating,
    setShouldRender,
    ref,
    handleIsOpenedComment,
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
  configureAnchors({ offset: -90, scrollDuration: 500 });

  const handleClick = () => {
    handleIsOpenedComment();
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
        author: userInfo.id,
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

  const getLinkToComment = (url: string) => url.split('#')[0];

  return (
    <ScrollableAnchor id={commentId}>
      <div className={styles.advancedComment}>
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
            <div className={styles.ratingComponent}>
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
            </div>
            )}
            { shouldRender
          && (
          <a href={`#${parentCommentId}`} data-tooltip="Up to main comment">
            <UpToParentCommentSvg />
          </a>
          )}
            <Popup
              content="Copy link"
              mouseEnterDelay={500}
              closeOnTriggerClick
              on="hover"
              trigger={(
                <span>
                  <Popup
                    content="Copied!"
                    on="click"
                    closeOnTriggerMouseLeave
                    trigger={(
                      <span>
                        <CopyToClipboard text={`${getLinkToComment(window.location.href)}#${commentId}`}>
                          <button style={{ background: 'none' }} type="button">
                            <LinkSvg />
                          </button>
                        </CopyToClipboard>
                      </span>
                  )}
                  />
                </span>
              )}
            />
            <a href="/" data-tooltip="Share comment">
              <ShareCommentSvg />
            </a>
          </div>
        </div>
        <div className="text">
          {text}
        </div>
        { isAuthorized && (
        <div className={styles.dsa}>
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
    </ScrollableAnchor>
  );
});

export default AdvancedComment;
