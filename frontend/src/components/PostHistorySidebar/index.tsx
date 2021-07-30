import React from 'react';
import styles from './styles.module.scss';

export interface IProfileSidebarProps {
}

function HistorySidebar(props) {
  if(props.history.length===0){
    return null;
  }
  let links = [];
  props.history.forEach((date: string) => {
    links.push(
    <div className={styles.link}>
      <div className={styles.dot}></div>
      <a>{date}</a>
    </div>
    )
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
  )
}

export default HistorySidebar;