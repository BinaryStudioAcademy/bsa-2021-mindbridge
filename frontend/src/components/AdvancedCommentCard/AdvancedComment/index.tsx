import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import React, { FunctionComponent, useState } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';
import LinkSvg from '@components/AdvancedCommentCard/svg/LinkSvg';
import UpToParentCommentSvg from '@components/AdvancedCommentCard/svg/UpToParentCommentSvg';
import ShareCommentSvg from '@components/AdvancedCommentCard/svg/shareCommentSvg';
import RatingComponent from '@screens/ViewPost/components/svgs/RatingIcon';
import ArrowCloseComment from '@components/AdvancedCommentCard/svg/ArrowCloseComment';
import { ICommentReply } from '@screens/ViewPost/models/ICommentReply';

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
}

const AdvancedComment: FunctionComponent<IBasicCommentProps> = React.forwardRef((
  {
    userId,
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
    isAuthorized
  }
) => {
  const [disabled, setDisabled] = useState(false);
  const [rotateArrowHook, setRotateArrowHook] = useState(false);
  const [shouldRender] = useState(setShouldRender);

  const rotateArrow = {
    transform: rotateArrowHook && 'rotate(90deg)',
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
    text: ''
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
        replyCommentId: commentId
      };
      sendReply(addComment);
    }
  };

  return (
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
          <a href={`/user/${author.id}`} className="author">
            {author.nickname ?? (`${author.firstName} ${author.lastName}`) }
          </a>
          <DividerSvg />
          <div className="metadata">
            <span className="date">{moment(createdAt).fromNow()}</span>
          </div>
        </div>
        <div className={styles.commentRightAction}>
          <RatingComponent postRating={commentRating} />
          {/* <RatingComponent*/}
          {/*  postRating={commentRating}*/}
          {/*  handleDisLikePost={handleDisLikePost}*/}
          {/*  handleLikePost={handleLikePost}*/}
          {/*  postId={commentId}*/}
          {/*  userInfo={userInfo}*/}
          {/*  arrowDownColor={userInfo.userReactions.find(postReaction => postReaction.postId === commentId*/}
          {/*    && !postReaction.liked)*/}
          {/*    ? ('#F75C48'*/}
          {/*    ) : (*/}
          {/*      '#66B9FF'*/}
          {/*    )}*/}
          {/*  arrowUpColor={userInfo.userReactions.find(postReaction => postReaction.postId === commentId*/}
          {/*    && postReaction.liked)*/}
          {/*    ? ('#8AC858'*/}
          {/*    ) : (*/}
          {/*      '#66B9FF'*/}
          {/*    )}*/}
          {/*/ >*/}
          { shouldRender
            && <UpToParentCommentSvg />}
          <LinkSvg />
          <ShareCommentSvg />
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
