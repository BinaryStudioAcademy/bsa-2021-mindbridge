import React, { forwardRef, FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import provideValue from './provideValue';
import { MentionsInput, Mention } from 'react-mentions';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import { ICommentReply } from '@screens/ViewPost/models/ICommentReply';
import { useDebouncedCallback } from 'use-debounce';
import { IComment } from '@screens/ViewPost/models/IComment';
import commentInputStyle from './commentInputStyle.module.scss';
import replyInputStyle from './replyInputStyle.module.scss';

import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import classNames from 'classnames';

interface IUserMentionsProps {
  onChange: any;
  sendReply: any;
  setDisabled: any;
  sendComment: any;
  userInfo: IUserProfile;
  postId: string;
  commentId: string;
  searchUsersByNickname: any;
  users: any;
  isReply: boolean;
  editMode: boolean;
  asd: boolean;
}

const AsyncUserMentions: FunctionComponent<IUserMentionsProps> = (
  {
    onChange,
    sendReply,
    setDisabled,
    sendComment,
    userInfo,
    postId,
    commentId,
    searchUsersByNickname,
    users,
    isReply,
    editMode
  }
) => {
  const [newReply, setNewReply] = useState<ICommentReply>({
    author: '',
    postId: '',
    replyCommentId: '',
    text: '',
    avatar: null,
    nickname: '',
    rating: 0
  });

  const [newComment, setNewComment] = useState<IComment>({
    text: '',
    author: '',
    postId: '',
    avatar: null,
    nickname: '',
    rating: 0
  });

  const handleNewComment = (event: any) => {
    setNewComment({
      ...newComment,
      text: event.target.value
    });
  };

  const handleSendComment = () => {
    if (newComment.text.trim().length) {
      const addComment = {
        text: newComment.text.replace(/<(.+?)>/g, '&lt;$1&gt;'),
        author: userInfo.id,
        postId,
        avatar: userInfo.avatar,
        nickname: userInfo.nickname
      };
      sendComment(addComment);
      setNewComment({
        ...newComment,
        text: ''
      });
    }
  };

  const [usersList, setUsersList] = useState({ user: [{
    display: '',
    id: ''
  }] });

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

  const handleNewReply = (event: any) => {
    setNewReply({
      ...newReply,
      text: event.target.value
    });
  };

  const handleEventNewReplyInput = (event: any) => {
    handleMentionsInput(event);
    handleNewReply(event);
  };

  const handleEventNewCommentInput = (event: any) => {
    handleMentionsInput(event);
    handleNewComment(event);
  };

  const handleSendReply = () => {
    if (newReply.text.trim().length) {
      const addComment = {
        text: newReply.text.replace(/<(.+?)>/g, '&lt;$1&gt;'),
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

  return (
    <div>
      {isReply ? (
        <div>
          <MentionsInput
            value={newReply.text}
            onChanges={onChange}
            onChange={handleEventNewReplyInput}
            className="mentions"
            classNames={replyInputStyle}
          >
            <Mention
              className={replyInputStyle.mentions__mention__custom}
              trigger="@"
              data={usersList}
            />
          </MentionsInput>
          <div className="actions">
            <DarkBorderButton
              onClick={handleSendReply}
              className={newReply.text ? classNames(styles.buttonSend, styles.buttonSendFill) : styles.buttonSend}
              content="Send"
            />
          </div>
        </div>
      ) : (
        <div>
          <MentionsInput
            value={newComment.text}
            onChanges={onChange}
            onChange={handleEventNewCommentInput}
            className="mentions"
            classNames={commentInputStyle}
            appendSpaceOnAdd
            placeholder="Add to the discussion..."
          >
            <Mention
              className={commentInputStyle.mentions__mention__custom}
              trigger="@"
              data={usersList}
            />
          </MentionsInput>

          <DarkBorderButton
            onClick={handleSendComment}
            className={newComment.text ? classNames(styles.buttonSend, styles.buttonSendFill) : styles.buttonSend}
            content="Send"
          />
        </div>
      )}
    </div>
  );
};

const asExample = provideValue('');

export default asExample(AsyncUserMentions);
