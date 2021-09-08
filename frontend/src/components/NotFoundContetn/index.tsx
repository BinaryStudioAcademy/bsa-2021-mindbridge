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
    <NoResultsSvg width="35%" height="35%" />
    <p className={styles.emptyLabel}>
      {description}
    </p>
  </div>
);

export default NotFoundContent;
