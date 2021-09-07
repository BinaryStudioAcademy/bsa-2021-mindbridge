import React, { FunctionComponent } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import BasicComment from '@components/BasicCommentCard/components/BasicComment';
import { ICommentAuthor } from '@screens/ViewPost/models/ICommentAuthor';

interface ICommentProps {
  createdAt: string;
  text: string;
  author: ICommentAuthor;
  commentRating: number;
}

const Reply: FunctionComponent<ICommentProps> = ({ author, createdAt, text }) => (
  <div className={styles.comment}>
    <BasicComment createdAt={createdAt} text={text} author={author} />
  </div>
);

export default Reply;
