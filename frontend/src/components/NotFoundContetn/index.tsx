import React from 'react';
import NoResultsSvg from '@components/svgs/NoResultsSvg';
import styles from './styles.module.scss';

const NotFoundContent: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.emptyContent}>
      <NoResultsSvg width="100%" height="100%" />
    </div>
    <p className={styles.emptyLabel}>
      Seems like there are no result...
    </p>
  </div>
);

export default NotFoundContent;
