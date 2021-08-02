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
    <button className={styles.btnSuggest}>
      <p>Suggest changes</p>
    </button>
  </div>
  );
}

export default SuggestChangesCard;
