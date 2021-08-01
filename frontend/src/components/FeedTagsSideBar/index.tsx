import React, { FunctionComponent } from 'react';
import SvgSearch from '@components/FeedSvgComponents/svgSearch';
import styles from './styles.module.scss';

const FeedTagsSideBar: FunctionComponent = () => {
  const tags = [{ id: 1, name: 'IT' }, { id: 2, name: 'Code' }, { id: 3, name: 'Humor' }, { id: 4, name: 'Work' },
    { id: 5, name: 'Tech' }, { id: 6, name: 'API' }, { id: 7, name: 'React' }, { id: 8, name: 'Sport' },
    { id: 9, name: 'Books' }, { id: 10, name: 'Self' }, { id: 11, name: 'Fitness' }];

  return (
    <div className={styles.tagsSideBar}>
      <div className={styles.title}>
        Search by tags
      </div>
      <div className={styles.searchInput}>
        <input type="text" placeholder="Search..." />
        <button type="button">
          <SvgSearch />
        </button>
      </div>
      <div className={styles.btnWrapper}>
        <div>
          {tags.map(tag => (
            <button
              type="button"
              key={tag.id}
              className={styles.tag}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
      <button type="button" className={`${styles.dark_button} ${styles.searchBtn}`}>Search</button>
    </div>
  );
};

export default FeedTagsSideBar;
