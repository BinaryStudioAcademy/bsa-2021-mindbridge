import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import Reply from '@components/BasicCommentCard/components/Reply';
import { IComments } from '@screens/PullRequest/models/IComments';
import { IBindingCallback1 } from '@models/Callbacks';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IUser } from '@screens/PullRequest/models/IUser';
import { ICommentPR } from '@screens/PullRequest/models/ICommentPR';

interface ICommentProps {
  comments: IComments[];
  sendCommentPR: IBindingCallback1<object>;
  userInfo: ICurrentUser;
  prId: string;
  author: IUser;
}

const BasicCommentsFeed: FunctionComponent<ICommentProps> = ({
  comments,
  sendCommentPR,
  userInfo,
  prId
}) => {
  const [newPrComment, setNewPrComment] = useState<ICommentPR>({
    text: '',
    author: '',
    prId: '',
    avatar: null,
    nickname: ''
  });

  const handleNewPrComment = (event: any) => {
    setNewPrComment({
      ...newPrComment,
      text: event.target.value
    });
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
    <div className={styles.main}>
      <p className={styles.commentCounter}>
        {' '}
        Discussion (
        {comments.length}
        )
        {' '}
      </p>
      <form className="ui reply form">
        <div className="field">
          <textarea
            value={newPrComment.text}
            onChange={handleNewPrComment}
            placeholder="Add to the discussion..."
          />
        </div>
        <DarkBorderButton
          className={styles.buttonSend}
          content="Send"
          onClick={handleSentPrComment}
        />
      </form>
      <div className="ui comments">
        <div className="comment">
          {comments.map(comment => (
            <Reply
              createdAt={comment.createdAt}
              text={comment.text}
              author={comment.author}
              userInfo={userInfo}
              prId={prId}
              sendCommentPR={sendCommentPR}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicCommentsFeed;
