import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import BasicComment from '@components/BasicCommentCard/components/BasicComment';
import { ICommentAuthor } from '@screens/ViewPost/models/ICommentAuthor';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';

interface ICommentProps {
  createdAt: string;
  text: string;
  author: ICommentAuthor;
  sendCommentPR: IBindingCallback1<object>;
  userInfo: ICurrentUser;
  prCommentId: string;
  editPrComment: IBindingCallback1<object>;
  updatedAt: string;
  users: IMentionsUser[];
  searchUsersByNickname: any;
  resetSendingPrComment: IBindingAction;
  sendingEditPrComment: boolean;
}

const Reply: FunctionComponent<ICommentProps> = ({
  author,
  createdAt,
  text,
  prCommentId,
  editPrComment,
  updatedAt,
  users,
  searchUsersByNickname,
  userInfo,
  resetSendingPrComment,
  sendingEditPrComment
}) => (
  <div className={styles.comment}>
    <BasicComment
      userInfo={userInfo}
      createdAt={createdAt}
      text={text}
      author={author}
      prCommentId={prCommentId}
      editPrComment={editPrComment}
      updatedAt={updatedAt}
      users={users}
      searchUsersByNickname={searchUsersByNickname}
      resetSendingPrComment={resetSendingPrComment}
      sendingEditPrComment={sendingEditPrComment}
    />
  </div>
);

export default Reply;
