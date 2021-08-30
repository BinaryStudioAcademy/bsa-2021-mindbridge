import React, { useState } from 'react';
import classNames from './styles.module.scss';
import provideValue from './provideValue';
import { MentionsInput, Mention } from 'react-mentions';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import styles from '@components/AdvancedCommentCard/AdvancedComment/styles.module.scss';
import { ICommentReply } from '@screens/ViewPost/models/ICommentReply';

function fetchUsers(query, callback) {
  if (!query) return;
  fetch(`/api/user/finduser/${query}`)
    .then(res => res.json())
    .then(res => res.map(user => ({ display: user.nickname, id: user.nickname })))
    .then(callback);
}

function AsyncUserMentions(
  {
    onChange,
    sendReply,
    setDisabled,
    userInfo,
    postId,
    commentId
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
  return (
    <div>
      <MentionsInput
        value={newReply.text}
        onChanges={onChange}
        onChange={handleNewReply}
        className="mentions"
        classNames={classNames}
        a11ySuggestionsListLabel="Suggested Github users for mention"
      >
        <Mention
          displayTransform={login => `@${login}`}
          data={fetchUsers}
          className={classNames.mentions__mention}
        />
      </MentionsInput>

      <div className="actions">
        <DarkBorderButton
          onClick={handleSendReply}
          className={styles.sendCommentBtn}
          content="Send"
        />
      </div>
    </div>
  );
}

const asExample = provideValue('');

export default asExample(AsyncUserMentions);
