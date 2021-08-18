import React from 'react';
import styles from './styles.module.scss';
import SuggestChangesBtn from '@screens/ViewPost/components/Button/SuggestChangesBtn';

function SuggestChangesCard({ postId, isAuthor }) {
  return (
    <div className={styles.back}>
      <span className={styles.title}>
        If you see incorrect information, you can offer to change it.
      </span>
      {!isAuthor && (
        <span className={styles.description}>
          The author will consider your proposal and give an answer soon.
        </span>
      )}
      <SuggestChangesBtn isAuthor={isAuthor} postId={postId} />
    </div>
  );
}

export default SuggestChangesCard;
