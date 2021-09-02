import React, { useState } from 'react';
import classNames from './styles.module.scss';
import provideValue from './provideValue';
import { MentionsInput, Mention } from 'react-mentions';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import styles from '@components/AdvancedCommentCard/AdvancedComment/styles.module.scss';
import { ICommentReply } from '@screens/ViewPost/models/ICommentReply';
import { useDebouncedCallback } from 'use-debounce';

function AsyncUserMentions(
  {
    onChange,
    handleSendComment,
    handleNewComment,
    setDisabled,
    userInfo,
    postId,
    commentId,
    searchUsersByNickname,
    users,
    buttonType,
    newComment
  }
) {
  const [newReply, setNewReply] = useState<ICommentReply>({
    author: '',
    postId: '',
    replyCommentId: '',
    text: '',
    avatar: null,
    nickname: '',
    rating: 0
  });

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

  const [nickname, setNickname] = useState('');

  const handleMentionsInput = (event: any) => {
    debounced(event.target.value);
    setNickname(event.target.value);
    updateUserList();
  };

  const handleEventInput = (event: any) => {
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
      <MentionsInput
        value={newComment.text}
        onChanges={onChange}
        onChange={handleEventInput}
        className="mentions"
        classNames={classNames}
      >
        <Mention
          className={classNames.mentions__mention__custom}
          trigger="@"
          data={usersList}
        />
      </MentionsInput>
      {buttonType === "buttonReply" ? (
        <div className="actions">
          <DarkBorderButton
            onClick={handleSendReply}
            className={styles.sendCommentBtn}
            content="Send"
          />
        </div>
      ) : (
        <DarkBorderButton
          onClick={handleSendComment}
          className={styles.buttonSend}
          content="Send"
        />
      )}

    </div>
  );
}

const asExample = provideValue('');

export default asExample(AsyncUserMentions);
