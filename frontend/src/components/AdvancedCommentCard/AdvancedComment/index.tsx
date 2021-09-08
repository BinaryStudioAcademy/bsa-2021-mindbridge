import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import React, { FunctionComponent, useState, useEffect } from 'react';
import moment from 'moment';
import LinkSvg from '@components/AdvancedCommentCard/svg/LinkSvg';
import UpToParentCommentSvg from '@components/AdvancedCommentCard/svg/UpToParentCommentSvg';
import ArrowCloseComment from '@components/AdvancedCommentCard/svg/ArrowCloseComment';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import RatingComponent from '@screens/ViewPost/components/svgs/RatingIcon';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import { Popup } from 'semantic-ui-react';
import AsyncUserMentions from '@components/AdvancedCommentCard/mentition/mentition';
import parse from 'html-react-parser';
import EditSvg from '@screens/ViewPost/components/svgs/SvgComponents/editSvg';
import { IEditComment } from '@screens/ViewPost/models/IEditComment';
import provideValue from '@components/AdvancedCommentCard/mentition/provideValue';
import { useDebouncedCallback } from 'use-debounce';
import { MentionsInput, Mention } from 'react-mentions';
import mentionInputStyle from './mentionInputStyles.module.scss';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import { IComments } from '@screens/ViewPost/models/IComments';
import { ICommentAuthor } from '@screens/ViewPost/models/ICommentAuthor';
import classNames from 'classnames';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: ICommentAuthor;
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
  users: any;
  editComment: any;
  onChange: any;
  updatedAt: string;
  comment: IComments;
}
/* eslint-disable max-len */
const AdvancedComment: FunctionComponent<IBasicCommentProps> = React.forwardRef((
  {
    userInfo,
    postId,
    createdAt,
    updatedAt,
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
    users,
    comment,
    editComment,
    onChange
  }
) => {
  const [disabled, setDisabled] = useState(false);
  const [rotateArrowHook, setRotateArrowHook] = useState(false);
  const [shouldRender] = useState(setShouldRender);
  const [editMode, setEditMode] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const rotateArrow = {
    width: '0.7142em',
    height: '0.7142em',
    transform: rotateArrowHook && 'rotate(180deg)',
    transition: 'transform 300ms ease'
  };
  configureAnchors({ offset: -90, scrollDuration: 500 });
  useEffect(() => {
    if (window.location.toString().split('#')[1]
    && window.location.toString().split('#')[1] === comment.id) {
      setHighlight(true);
    }
  }, [window.location]);

  const handleClick = () => {
    handleIsOpenedComment();
    setRotateArrowHook(!rotateArrowHook);
  };

  const [changeableComment, setChangeableComment] = useState<IEditComment>({
    text,
    commentId: ''
  });

  const checkForNickname = (textComment: string) => {
    const commentText = textComment || changeableComment.text;
    return commentText.replace(/@\[([^()]+)\]\(([^()]+)\)/g, '<a href=/user/$2>$1</a>');
  };

  const checkAuthorPost = (authorPostId, userID) => authorPostId === userID;

  const getLinkToComment = (url: string) => url.split('#')[0];

  const [usersList, setUsersList] = useState({ user: [{
    display: '',
    id: ''
  }] });

  const handleEditComment = (event: any) => {
    setChangeableComment({
      ...changeableComment,
      text: event.target.value
    });
  };

  const handleSendChangeableComment = (event: any) => {
    if (changeableComment.text.trim().length) {
      const newChangeableComment = {
        text: changeableComment.text.replace(/<(.+?)>/g, '&lt;$1&gt;'),
        commentId
      };
      editComment(newChangeableComment);
      setEditMode(!editMode);
    }
  };

  const updateUserList = () => {
    setUsersList(users.map(user => (({ display: `@${user.nickname}`, id: user.id }))));
  };

  const debounced = useDebouncedCallback(value => {
    searchUsersByNickname(value);
  }, 1000);

  const handleMentionsInput = (event: any) => {
    debounced(event.target.value);
    updateUserList();
  };

  const handleEventEditCommentInput = (event: any) => {
    handleMentionsInput(event);
    handleEditComment(event);
  };

  const checkDate = (createdDate, updetedDate) => {
    if (createdDate !== updetedDate) {
      return (
        <span>
          Edit:
          {' '}
          {moment(updetedDate).fromNow()}
        </span>
      );
    }
    return moment(createdDate).fromNow();
  };

  return (
    <ScrollableAnchor id={commentId}>
      <div className={highlight ? classNames(styles.advancedComment, styles.highlight2) : styles.advancedComment}>
        <div className={styles.header}>
          { shouldRenderArrowCloseComment && (
          <button ref={ref} id="button" className={styles.closeCommentBtn} type="button" onClick={() => handleClick()}>
            <div className={styles.arrowClose} style={rotateArrow}><ArrowCloseComment /></div>
          </button>
          )}
          <div className={styles.commentAuthor}>
            <a href={`/user/${author.id}`} className="avatar">
              <Image alt="avatar" src={author.avatar ?? defaultAvatar} />
            </a>
            <a
              href={`/user/${author.id}`}
              className={(checkAuthorPost(postAuthorId, author.id)) ? styles.postAuthor : styles.author}
            >
              <p>{author.nickname}</p>
            </a>
            <DividerSvg />
            <div className="metadata">
              <span className="date">
                {checkDate(createdAt, updatedAt)}
              </span>
            </div>
          </div>
          <div className={styles.commentRightAction}>
            {author.id === userInfo.id && (
              <div>
                {!disabled && (
                <button type="button" className={styles.editComment} onClick={() => setEditMode(!editMode)}>
                  <EditSvg />
                </button>
                )}
              </div>
            )}
            <div className={styles.ratingComponent}>
              <RatingComponent
                postRating={commentRating ?? 0}
                handleDisLikePost={handleDislikeComment}
                handleLikePost={handleLikeComment}
                post={comment}
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
          </div>
        </div>
        <div className="text">
          { editMode ? (
            <div>
              <MentionsInput
                value={changeableComment.text}
                onChanges={onChange}
                onChange={handleEventEditCommentInput}
                className="mentions"
                classNames={mentionInputStyle}
              >
                <Mention
                  className={mentionInputStyle.mentions__mention__custom}
                  trigger="@"
                  data={usersList}
                />
              </MentionsInput>

              <div className={styles.btn_wrapper}>
                <DarkBorderButton onClick={() => setEditMode(!editMode)} className={styles.btnCancel} content="Cancel" />
                <DarkBorderButton onClick={handleSendChangeableComment} className={styles.btnEdit} content="Save" />
              </div>
            </div>
          ) : (
            <div>
              {parse(checkForNickname(text))}
            </div>
          ) }

        </div>
        { isAuthorized && (
        <div className={styles.reply}>
          <div className="actions">
            {!editMode && (
              <DarkBorderButton className={styles.btnReplay} content="Reply" onClick={() => setDisabled(!disabled)} />
            )}
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
              isReply
              editMode
            />
          </div>
          )}
        </div>
        ) }
      </div>
    </ScrollableAnchor>
  );
});

const provide = provideValue('');

export default provide(AdvancedComment);
