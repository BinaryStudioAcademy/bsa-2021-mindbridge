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

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  commentRating: number;
  setShouldRender: boolean;
}

const AdvancedComment: FunctionComponent<IBasicCommentProps> = (
  { createdAt, text, author, commentRating, setShouldRender }
) => {
  const [disabled, setDisabled] = useState(false);
  const [shouldRender] = useState(setShouldRender);

  return (
    <div className={styles.advancedComment}>
      <div className={styles.header}>
        <div className={styles.commentAuthor}>
          <a href="/" className="avatar">
            <img alt="avatar" src={author.avatar ?? 'https://i.imgur.com/LaWyPZF.png'} />
          </a>
          <a href="/" className="author">
            {author.firstName}
            {' '}
            {author.lastName}
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
      <div className="actions">
        <DarkBorderButton className={styles.btnReplay} content="Reply" onClick={() => setDisabled(!disabled)} />
      </div>
      {disabled ? (
        <div className={styles.replayBlock}>
          <textarea placeholder="Feel free..." className={styles.replyText} />
          <div className="actions">
            <DarkBorderButton className={styles.sendCommentBtn} content="Send" />
          </div>
        </div>
      ) : (<div style={{ display: 'none' }} />) }
    </div>
  );
};

export default AdvancedComment;
