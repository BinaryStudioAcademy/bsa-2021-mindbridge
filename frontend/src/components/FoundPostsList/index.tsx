import styles from '@screens/Header/containers/HeaderPage/styles.module.scss';
import React, { FunctionComponent } from 'react';
import { IPost } from '@screens/Header/models/IPost';
import { Link } from 'react-router-dom';

interface IFoundPostsList {
  post: IPost;
  linkClick: any;
}

const FoundPostsList: FunctionComponent<IFoundPostsList> = (
  { post, linkClick }
) => (
  <li>
    <Link to={`/post/${post.sourceId}`} className={styles.foundPostLink} onClick={linkClick}>
      {post.title}
    </Link>
  </li>
);

export default FoundPostsList;

