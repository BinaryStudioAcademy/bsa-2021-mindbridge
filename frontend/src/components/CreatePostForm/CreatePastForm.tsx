import React from 'react';
import styles from './styles.module.scss';
import Image1 from './svg/svg1';
import Image2 from './svg/svg2';

function CreatePostForm() {
  return (
    <form className={styles.create_post_form}>
      <label className={styles.file_input_rectangle}>
        <Image1 />
        <span>Add a cover image</span>
        <input className={styles.invisible} type="file" />
      </label>
      <input type="text" placeholder="Enter the title of the article" />
      <div className={styles.content_input_container}>
        <label className={styles.file_input_round}>
          <Image2 />
          <input className={styles.invisible} type="file" />
        </label>
        <textarea className={styles.content_input} placeholder="Write your post content" />
      </div>
      <input type="text" placeholder="Enter tags" />
    </form>
  );
}

export default CreatePostForm;