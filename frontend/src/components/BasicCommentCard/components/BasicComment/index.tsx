import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import React, { FunctionComponent, useState } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import moment from 'moment';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import parse from 'html-react-parser';
import { Popup } from 'semantic-ui-react';
import LinkSvg from '@components/AdvancedCommentCard/svg/LinkSvg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IBindingCallback1 } from '@models/Callbacks';
import { IEditPrComment } from '@screens/PullRequest/models/IEditPrComment';
import EditSvg from '@screens/ViewPost/components/svgs/SvgComponents/editSvg';
import { useDebouncedCallback } from 'use-debounce';
import { MentionsInput, Mention } from 'react-mentions';
import provideValue from '../PrMentition/provideValue';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import mentionInputStyle from './mentionInputStyle.module.scss';

interface IBasicCommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  prCommentId: string;
  editPrComment: IBindingCallback1<object>;
  updatedAt: string;
  users: any;
  searchUsersByNickname: any;
  onChange: any;
}

const BasicComment: FunctionComponent<IBasicCommentProps> = ({
  onChange,
  createdAt,
  text,
  author,
  prCommentId,
  editPrComment,
  updatedAt,
  users,
  searchUsersByNickname
}) => {
  const [editMode, setEditMode] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [changeablePrComment, setChangeablePrComment] = useState<IEditPrComment>({
    text,
    prCommentId: ''
  });
  const [usersList, setUsersList] = useState({ user: [{
    display: '',
    id: ''
  }] });
  // eslint-disable-next-line max-len
  const checkForNickname = (textComment: string) => {
    const commentText = textComment || changeablePrComment.text;
    return commentText.replace(/@\[([^()]+)\]\(([^()]+)\)/g, '<a href=/user/$2>$1</a>');
  };

  const getLinkToComment = (url: string) => url.split('#')[0];

  const handleEditPrComment = (event: any) => {
    setChangeablePrComment({
      ...changeablePrComment,
      text: event.target.value
    });
  };

  const handleSendChangeablePrComment = (event: any) => {
    if (changeablePrComment.text.trim().length) {
      const comment = {
        text: changeablePrComment.text.replace(/<(.+?)>/g, '&lt;$1&gt;'),
        prCommentId
      };
      editPrComment(comment);
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
    handleEditPrComment(event);
  };

  const checkDate = (createdDate, updatedDate) => {
    if (createdDate !== updatedDate) {
      return (
        <span>
          Edit:
          {' '}
          {moment(updatedDate).fromNow()}
        </span>
      );
    }
    return moment(createdDate).fromNow();
  };

  return (
    <div className={styles.basicComment}>
      <div className={styles.header}>
        <div className={styles.commentAuthor}>
          <a href={`/user/${author.id}`} className="avatar">
            <Image alt="avatar" src={author.avatar ?? defaultAvatar} />
          </a>
          <a href={`/user/${author.id}`} className="author">
            {author.nickname}
          </a>
          <DividerSvg />
          <div className="metadata">
            <span className="date">
              {checkDate(createdAt, updatedAt)}
            </span>
          </div>
          <div className={styles.commentRightAction}>
            {!disabled && (
              <button type="button" className={styles.editComment} onClick={() => setEditMode(!editMode)}>
                <EditSvg />
              </button>
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
                        <CopyToClipboard text={`${getLinkToComment(window.location.href)}#${prCommentId}`}>
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
      </div>
      <div className="text">
        { editMode ? (
          <div>
            <MentionsInput
              value={changeablePrComment.text}
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
              <DarkBorderButton onClick={handleSendChangeablePrComment} className={styles.btnEdit} content="Save" />
            </div>
          </div>
        ) : (
          <div>
            {parse(checkForNickname(text))}
          </div>
        ) }
      </div>
    </div>
  );
};

const provide = provideValue('');

export default provide(BasicComment);
