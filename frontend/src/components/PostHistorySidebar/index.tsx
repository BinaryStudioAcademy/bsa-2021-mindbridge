import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { Placeholder } from 'semantic-ui-react';

export interface IProfileSidebarProps {
  history: IPostVersion[];
  postId: string;
  userLoading: boolean;
}

const HistorySidebar: FunctionComponent<IProfileSidebarProps> = ({ history, postId, userLoading }) => {
  if (history.length === 0) {
    return null;
  }

  const links = [];
  history.forEach(version => {
    links.push(
      <div key={version.id} className={styles.link}>
        <div className={styles.dot} />
        <Link to={`/postVersion/${version.id}`}>{version.createdAt}</Link>
      </div>
    );
  });

  return (
    <div className={styles.history_sidebar_container}>
      <div className={styles.title}>
        <Link to={`/post/versions/${postId}`}>
          <span>History of your post</span>
        </Link>
      </div>
      {!userLoading ? (
        <div className={styles.history_links}>
          {links}
        </div>
      ) : (
        <Placeholder>
          <Placeholder.Line length="very long" />
          <Placeholder.Line length="very long" />
          <Placeholder.Line length="very long" />
          <Placeholder.Line length="very long" />
          <Placeholder.Line length="very long" />
        </Placeholder>
      )}
    </div>
  );
};

export default HistorySidebar;
