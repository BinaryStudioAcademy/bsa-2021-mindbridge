import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import Reply from '@components/BasicCommentCard/components/Reply';
import { IComments } from '@screens/PullRequest/models/IComments';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
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
  editPrComment: IBindingCallback1<object>;
  resetSendingPrComment: IBindingAction;
  sendingEditPrComment: boolean;
}

const BasicCommentsFeed: FunctionComponent<ICommentProps> = ({
  comments,
  sendCommentPR,
  userInfo,
  prId,
  users,
  searchUsersByNickname,
  editPrComment,
  resetSendingPrComment,
  sendingEditPrComment
}) => (
  <div className={styles.main}>
    <p className={styles.commentCounter}>
      {' '}
      Discussion (
      {comments.length}
      )
      {' '}
    </p>
    {comments.length > 0 && (
    <div className="ui comments">
      <div className="comment">
        <div>
          {comments.map(comment => (
            <Reply
              createdAt={comment.createdAt}
              text={comment.text}
              updatedAt={comment.updatedAt}
              author={comment.author}
              prCommentId={comment.id}
              userInfo={userInfo}
              sendCommentPR={sendCommentPR}
              editPrComment={editPrComment}
              users={users}
              searchUsersByNickname={searchUsersByNickname}
              resetSendingPrComment={resetSendingPrComment}
              sendingEditPrComment={sendingEditPrComment}
            />
          ))}
        </div>
      </div>
    </div>
    )}
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
