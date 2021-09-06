import React, { FunctionComponent } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import BasicComment from '@components/BasicCommentCard/components/BasicComment';
import { IBindingCallback1 } from '@models/Callbacks';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';

interface ICommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  sendCommentPR: IBindingCallback1<object>;
  userInfo: ICurrentUser;
  prCommentId: string;
}

const Reply: FunctionComponent<ICommentProps> = ({
  author,
  createdAt,
  text,
  prCommentId
}) => (
  <div className={styles.comment}>
    <BasicComment
      createdAt={createdAt}
      text={text}
      author={author}
      prCommentId={prCommentId}
    />
  </div>
);

export default Reply;
