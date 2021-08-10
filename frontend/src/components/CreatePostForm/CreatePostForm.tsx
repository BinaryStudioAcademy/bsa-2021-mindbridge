import React from 'react';
import styles from './styles.module.scss';
import CoverImageSvg from './svg/coverImageSvg';
import AddImageSvg from './svg/addImageSvg';
import { IForm, IModes } from '@root/screens/CreatePost/models/IData';
import { useDropzone } from 'react-dropzone';
import TagsDropdown from '../TagsDropdown';

interface ICreatePostFormProps {
  form: IForm;
  modes: IModes;
  setForm: any;
  sendImage: any;
}

const CreatePostForm: React.FC<ICreatePostFormProps> = ({ form, setForm, sendImage }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: files => sendImage({ file: files[0], inContent: true })
  });
  const handelCoverFile = (event: any) => {
    if (!event.target.files[0]) {
      setForm({
        ...form,
        coverImage: {
          url: '',
          title: ''
        }
      });
    } else {
      sendImage({ file: event.target.files[0], inContent: false });
      setForm({
        ...form,
        coverImage: {
          url: '',
          title: 'loading...'
        }
      });
    }
  };
  const handleTitle = (event: any) => {
    setForm({
      ...form,
      title: event.target.value
    });
  };

  const handleContent = (event: any) => {
    setForm({
      ...form,
      content: event.target.value
    });
  };

  const handelImageInContent = (event: any) => {
    if (!event.target.files[0]) {
      return;
    }
    sendImage({ file: event.target.files[0], inContent: true });
  };

  const handleTags = (event: any, data: any) => {
    setForm({
      ...form,
      tags: data.value
    });
  };

  return (
    <form className={styles.create_post_form}>
      <label className={styles.file_input_rectangle} htmlFor="image-input-1" onChange={handelCoverFile}>
        <CoverImageSvg />
        {!form.coverImage.title ? <span>Add a cover image</span> : <span>{form.coverImage.title}</span>}
        <input id="image-input-1" className={styles.invisible} type="file" />
      </label>
      <input type="text" value={form.title} onChange={handleTitle} placeholder="Enter the title of the article" />
      <div className={styles.content_input_container}>

         {/*<label className={styles.file_input_round} onChange={handelImageInContent} htmlFor="image-input-2">*/}
         {/* <AddImageSvg />*/}
         {/* <input id="image-input-2" className={styles.invisible} type="file" />*/}
         {/*</label>*/}
        <div {...getRootProps({ className: 'dropzone' })} className={styles.addImageArea}>
          <div className={styles.addImageSvg}>
            <AddImageSvg />
          </div>
          <p>
            Drag and drop an image here or
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>choose image</label>
          </p>
          <input {...getInputProps()} id="image-input-2" className={styles.invisible} type="file" />
        </div>
        <textarea
          className={styles.content_input}
          value={form.content}
          onChange={handleContent}
          placeholder="Write your post content"
        />
      </div>
      <TagsDropdown onChange={handleTags} data={form.tags} />
    </form>
  );
};

export default CreatePostForm;
