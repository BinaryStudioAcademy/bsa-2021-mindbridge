import React from 'react';
import styles from './styles.module.scss';
import Image_1 from './svg/svg1';
import Image_2 from './svg/svg2';

function CreatePostForm(props) {
  return (
    <form className={styles.create_post_form}>
        
    <label className={styles.file_input_rectangle}>
      <Image_1/>
      <span>Add a cover image</span>
      <input className={styles.invisible} type="file"></input>
    </label>
    <input type="text" placeholder="Enter the title of the article"></input>
    <div className={styles.content_input_container}>
      <label className={styles.file_input_round}>
        <Image_2/>
        <input className={styles.invisible} type="file"></input>
      </label>
      <textarea className={styles.content_input} placeholder="Write your post content"></textarea>
    </div>
    <input  type="text" placeholder="Enter tags"></input>
  </form>
  )
}

export default CreatePostForm;

