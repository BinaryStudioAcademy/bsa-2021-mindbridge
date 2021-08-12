import React from 'react';
import styles from './styles.module.scss';

function SuggestChangesCard() {
  return (
    <div className={styles.back}>
      <span className={styles.title}>
        If you see incorrect information, you can offer to change it.
      </span>
      <span className={styles.description}>
        The author will consider your proposal and give an answer soon.
      </span>
      <button type="button" className={`${styles.dark_button} ${styles.button}`}>Suggest Change</button>
    </div>
  );
}

export default SuggestChangesCard;
