import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';
import LinkSvg from '@components/AdvancedCommentCard/svg/LinkSvg';
import UpToParentCommentSvg from '@components/AdvancedCommentCard/svg/UpToParentCommentSvg';
import ShareCommentSvg from '@components/AdvancedCommentCard/svg/shareCommentSvg';
import ArrowCloseComment from '@components/AdvancedCommentCard/svg/ArrowCloseComment';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import RatingComponent from '@screens/ViewPost/components/svgs/RatingIcon';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import { Popup } from 'semantic-ui-react';
import AsyncUserMentions from '@components/AdvancedCommentCard/mentition/mentition';
import TextRender from '@components/TextRenderer';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  commentRating: number;
  setShouldRender: boolean;
  ref: any;
  handleIsOpenedComment: any;
  shouldRenderArrowCloseComment: boolean;
  sendReply: any;
  postId: string;
  commentId: string;
  isAuthorized: boolean;
  userInfo: IUserProfile;
  postAuthorId: string;
  parentCommentId: string;
  handleLikeComment: any;
  handleDislikeComment: any;
  searchUsersByNickname: any;
  users: IMentionsUser[];
}
/* eslint-disable max-len */
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
    handleDislikeComment,
    searchUsersByNickname,
    users
  }
) => {
  const [disabled, setDisabled] = useState(false);
  const [rotateArrowHook, setRotateArrowHook] = useState(false);
  const [shouldRender] = useState(setShouldRender);
  const [usersList, setUsersList] = useState({ user: [{
    display: '',
    id: ''
  }] });

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

  const checkForNickname = (textComment: string) => textComment.replace(/@\[([^()]+)\]\(([^()]+)\)/g, '<a href=/user/$2>$1</a>');

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
                  .find(commentReaction => commentReaction.commentId === commentId && commentReaction.liked)
                  ? ('#8AC858'
                  ) : (
                    '#66B9FF'
                  )}
                arrowDownColor={userInfo.userReactionsComments.find(commentReaction => commentReaction.commentId === commentId && !commentReaction.liked)
                  ? ('#F75C48'
                  ) : (
                    '#66B9FF'
                  )}
              />
            </div>
            )}
            { shouldRender
          && (
          <Popup
            content="Up to main comment"
            mouseEnterDelay={1000}
            closeOnTriggerClick
            position="top center"
            on="hover"
            trigger={(
              <a href={`#${parentCommentId}`}>
                <UpToParentCommentSvg />
              </a>
                )}
          />
          )}
            <Popup
              content="Copy link"
              mouseEnterDelay={1000}
              closeOnTriggerClick
              position="top center"
              on="hover"
              trigger={(
                <span>
                  <Popup
                    content="Copied!"
                    on="click"
                    closeOnTriggerMouseLeave
                    position="top center"
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
            <Popup
              content="Share comment"
              mouseEnterDelay={1000}
              closeOnTriggerClick
              on="hover"
              position="top center"
              trigger={(
                <a href="/">
                  <ShareCommentSvg />
                </a>
              )}
            />
          </div>
        </div>
        <div className="text">
          <TextRender
            className={styles.commentText}
            markdown={false}
            content={checkForNickname(text)}
          />
        </div>
        { isAuthorized && (
        <div className={styles.dsa}>
          <div className="actions">
            <DarkBorderButton className={styles.btnReplay} content="Reply" onClick={() => setDisabled(!disabled)} />
          </div>
          {disabled && (
          <div className={styles.replayBlock}>
            <AsyncUserMentions
              setDisabled={setDisabled}
              userInfo={userInfo}
              postId={postId}
              commentId={commentId}
              sendReply={sendReply}
              users={users}
              searchUsersByNickname={searchUsersByNickname}
            />
          </div>
          )}
        </div>
        ) }
      </div>
    </ScrollableAnchor>
  );
});

export default AdvancedComment;
