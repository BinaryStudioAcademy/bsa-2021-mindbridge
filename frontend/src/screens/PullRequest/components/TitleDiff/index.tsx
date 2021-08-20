import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

// eslint-disable-next-line max-len
interface ITitleDiffProps {
  className?: string;
  oldTitle: string;
  newTitle: string;
}

const TitleDiff = ({ className, oldTitle, newTitle }: ITitleDiffProps) => {
  if (oldTitle === newTitle) {
    return (
      <div className={classNames(className, styles.titleDiff)}>
        <div className={styles.new}>
          <span>Title:</span>
          <span>{newTitle}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classNames(className, styles.titleDiff)}>
        <div className={styles.new}>
          <span>New title:</span>
          <span>{newTitle}</span>
        </div>
        <div className={styles.old}>
          <span>Old title:</span>
          <span>{oldTitle}</span>
        </div>
      </div>
    )
  }
}
  export default TitleDiff;
