import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { IPostVersions } from '@screens/PostPage/models/IPostVersions';

export interface IProfileSidebarProps {
  history: IPostVersions[];
}

const HistorySidebar: FunctionComponent<IProfileSidebarProps> = ({ history }) => {
  if (history.length === 0) {
    return null;
  }

  const links = [];
  history.forEach(date => {
    links.push(
      <div className={styles.link}>
        <div className={styles.dot} />
        <Link to="/create/post">{date.createdAt}</Link>
      </div>
    );
  });
  return (
    <div className={styles.history_sidebar_container}>
      <div className={styles.title}>
        History of your posts
      </div>
      <div className={styles.history_links}>
        {links}
      </div>
    </div>
  );
};

export default HistorySidebar;
