import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import DarkBorderButton from '@components/buttons/DarcBorderButton';
import Reply from '@components/BasicCommentCard/components/Reply';
import { IComments } from '@screens/PullRequest/models/IComments';
import { IBindingCallback1 } from '@models/Callbacks';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IUser } from '@screens/PullRequest/models/IUser';
import UserPrMentions from '@components/BasicCommentCard/components/PrMentition/mentition';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';

interface ICommentProps {
  comments: IComments[];
  sendCommentPR: IBindingCallback1<object>;
  userInfo: ICurrentUser;
  prId: string;
  author: IUser;
  searchUsersByNickname: any;
  users: IMentionsUser[];
}

const BasicCommentsFeed: FunctionComponent<ICommentProps> = ({
  comments,
  sendCommentPR,
  userInfo,
  prId,
  users,
  searchUsersByNickname
}) => (
  <div className={styles.main}>
    <p className={styles.commentCounter}>
      {' '}
      Discussion (
      {comments.length}
      )
      {' '}
    </p>
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
    <UserPrMentions
      userInfo={userInfo}
      prId={prId}
      searchUsersByNickname={searchUsersByNickname}
      users={users}
      sendCommentPR={sendCommentPR}
    />
  </div>
);

export default BasicCommentsFeed;
