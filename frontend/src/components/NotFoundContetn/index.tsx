import React from 'react';
import NoResultsSvg from '@components/svgs/NoResultsSvg';
import styles from './styles.module.scss';

interface INotFoundContent {
  description: string;
}

const NotFoundContent: React.FC<INotFoundContent> = (
  {
    description
  }
) => (
  <div className={styles.emptyContent}>
    <div className={styles.notResultSvg}>
      <NoResultsSvg width="100%" height="100%" />
    </div>
    <p className={styles.emptyLabel}>
      {description}
    </p>
  </div>
);

export default NotFoundContent;
