import React, { useState } from 'react';
import styles from './styles.module.scss';
import provideValue from './provideValue';
import { MentionsInput, Mention } from 'react-mentions';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import { useDebouncedCallback } from 'use-debounce';
import { ICommentPR } from '@screens/PullRequest/models/ICommentPR';

function UserPrMentions(
  {
    onChange,
    userInfo,
    prId,
    searchUsersByNickname,
    users,
    sendCommentPR
  }
) {
  const [newPrComment, setNewPrComment] = useState<ICommentPR>({
    text: '',
    author: '',
    prId: '',
    avatar: null,
    nickname: ''
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

  const handleMentionsInput = (event: any) => {
    debounced(event.target.value);
    updateUserList();
  };

  const handleNewPrComment = (event: any) => {
    setNewPrComment({
      ...newPrComment,
      text: event.target.value
    });
  };

  const handleEventInput = (event: any) => {
    handleMentionsInput(event);
    handleNewPrComment(event);
  };

  const handleSentPrComment = () => {
    if (newPrComment.text.trim().length) {
      const addCommentPr = {
        text: newPrComment.text.replace(/<(.+?)>/g, '&lt;$1&gt;'),
        author: userInfo.id,
        prId,
        avatar: userInfo.avatar,
        nickname: userInfo.nickname
      };
      setNewPrComment({
        ...newPrComment,
        text: ''
      });
      sendCommentPR(addCommentPr);
    }
  };

  return (
    <div>
      <MentionsInput
        value={newPrComment.text}
        onChanges={onChange}
        onChange={handleEventInput}
        className="mentions"
        classNames={styles}
      >
        <Mention
          appendSpaceOnAdd
          className={styles.mentions__mention__custom}
          trigger="@"
          data={usersList}
        />
      </MentionsInput>
      <div className="actions">
        <DarkBorderButton
          className={styles.buttonSend}
          content="Send"
          onClick={handleSentPrComment}
        />
      </div>
    </div>
  );
}

const provide = provideValue('');

export default provide(UserPrMentions);
