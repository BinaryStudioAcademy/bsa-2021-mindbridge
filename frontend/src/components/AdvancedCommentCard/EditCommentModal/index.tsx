import React, { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { IEditComment } from '@screens/ViewPost/models/IEditComment';
import replyInputStyle from '@components/AdvancedCommentCard/mentition/replyInputStyle.module.scss';
import { MentionsInput, Mention } from 'react-mentions';
import provideValue from './provideValue';
import { useDebouncedCallback } from 'use-debounce';

function EditCommentModal({
  onChange,
  editCommentMode,
  text,
  editComment,
  commentId,
  users,
  searchUsersByNickname
}) {
  const [opened, setOpened] = useState(editCommentMode);

  const [changeableComment, setChangeableComment] = useState<IEditComment>({
    text,
    commentId: ''
  });

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
      const comment = {
        text: changeableComment.text.replace(/<(.+?)>/g, '&lt;$1&gt;'),
        commentId
      };
      editComment(comment);
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

  const handleCloseModal = () => {
    setOpened(false);
  };

    return (
      <div>
      { opened && (
        <Modal
          open={editCommentMode}
          dimmer="blurring"
        >
          <Header content="Edit your comment" />
          <Modal.Content>
            <MentionsInput
              value={changeableComment.text}
              onChanges={onChange}
              onChange={handleEventEditCommentInput}
              className="mentions"
              classNames={replyInputStyle}
            >
              <Mention
                className={replyInputStyle.mentions__mention__custom}
                trigger="@"
                data={usersList}
              />
            </MentionsInput>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={handleCloseModal} inverted>
              <Icon name="remove" />
              {' '}
              Cancel
            </Button>
            <Button color="green" onClick={handleSendChangeableComment} inverted>
              <Icon name="checkmark" />
              {' '}
              Got it
            </Button>
          </Modal.Actions>
        </Modal>
      )}
      </div>
    );
}
const provide = provideValue('');

export default provide(EditCommentModal);
