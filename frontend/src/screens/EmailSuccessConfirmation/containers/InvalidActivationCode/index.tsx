import React from 'react';
import styles from './styles.module.scss';

const InvalidActivationCode = () => (
  <div className={styles.container}>
    <div className={styles.wrapper_block}>
      <div className={styles.wrapper_title}>
        <div className={styles.error_title}>Failed!</div>
      </div>
      <div className={styles.error_block}>
        <div className={styles.error_block_placeholder}>
          Invalid activation code. Please check your inbox or spam.
        </div>
      </div>
    </div>
  </div>
);

export default InvalidActivationCode;
