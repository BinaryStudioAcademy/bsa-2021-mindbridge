import React, { useState } from 'react';
import classNames from './styles.module.scss';
import provideValue from './provideValue';
import { MentionsInput, Mention } from 'react-mentions';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import styles from '@components/AdvancedCommentCard/AdvancedComment/styles.module.scss';
import { ICommentReply } from '@screens/ViewPost/models/ICommentReply';

function AsyncUserMentions(
  {
    onChange,
    sendReply,
    allUser,
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

  const data = allUser;

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
        markup="@[__display__]"
        classNames={classNames}
      >
        <Mention
          className={classNames.mentions__mention__custom}
          type="user"
          trigger="@"
          data={allUser}
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
