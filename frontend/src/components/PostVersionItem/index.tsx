import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { IPostVersionItem } from '@screens/PostVersions/models/IPostVersionItem';

export interface IPostVersionItemProps {
  postVersion: IPostVersionItem;
}

const PostVersionItem: FunctionComponent<IPostVersionItemProps> = ({ postVersion }) => (
  <div>
    <span>==========</span>
    <h6>{postVersion.id}</h6>
    <h6>{postVersion.createdAt}</h6>
  </div>
);

export default PostVersionItem;
