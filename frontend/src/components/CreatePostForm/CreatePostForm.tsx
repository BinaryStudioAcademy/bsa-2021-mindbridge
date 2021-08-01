import React from 'react';
import styles from './styles.module.scss';
import CoverImageSvg from './svg/coverImageSvg';
import AddImageSvg from './svg/addImageSvg';

function CreatePostForm() {
  return (
    <form className={styles.create_post_form}>
      <label className={styles.file_input_rectangle} htmlFor="image-input-1">
        <CoverImageSvg />
        <span>Add a cover image</span>
        <input id="image-input-1" className={styles.invisible} type="file" />
      </label>
      <input type="text" placeholder="Enter the title of the article" />
      <div className={styles.content_input_container}>
        <label className={styles.file_input_round} htmlFor="image-input-2">
          <AddImageSvg />
          <input id="image-input-1" className={styles.invisible} type="file" />
        </label>
        <textarea className={styles.content_input} placeholder="Write your post content" />
      </div>
      <input type="text" placeholder="Enter tags" />
    </form>
  );
}

export default CreatePostForm;
