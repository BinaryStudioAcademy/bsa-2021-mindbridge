import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { IPostsDates } from '@screens/CreatePost/models/IPostsDates';

export interface IProfileSidebarProps {
}

function HistorySidebar({ history }) {
  if (history.length === 0) {
    return null;
  }
  const links = [];
  history.forEach((date: IPostsDates) => {
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
}

export default HistorySidebar;
