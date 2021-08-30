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
    data,
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

  const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;

  return (
    <div>
      <MentionsInput
        value={newReply.text}
        onChanges={onChange}
        onChange={handleNewReply}
        className="mentions"
        markup="@[__display__](__type__:__id__)"
        displayTransform={display => `<<${display}>>`}
        classNames={classNames}
        a11ySuggestionsListLabel="Suggested Github users for mention"
      >
        <Mention
          type="user"
          trigger="@"
          data={data}
        />
        <Mention
          trigger={emailRegex}
          type="user"
          data={search => [{ id: search, display: search }]}
          markup="@[__display__](__type__:__id__)"
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
