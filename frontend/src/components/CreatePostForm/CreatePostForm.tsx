import React from 'react';
import styles from './styles.module.scss';
import CoverImageSvg from './svg/coverImageSvg';
import AddImageSvg from './svg/addImageSvg';
import { IForm, IModes } from '@root/screens/CreatePost/models/IData';
import { useDropzone } from 'react-dropzone';
import TagsDropdown from '../TagsDropdown';
import { toastr } from 'react-redux-toastr';

interface ICreatePostFormProps {
  form: IForm;
  modes: IModes;
  setForm: any;
  sendImage: any;
  allTags: [any];
}

const checkImageSize = file => {
  const BYTES_IN_MEGABYTE = 1024 * 1024;
  if (file.size > (BYTES_IN_MEGABYTE)) {
    toastr.error('Error', 'File is too large, use image less than 1Mb');
    return false;
  }
  return true;
};

const CreatePostForm: React.FC<ICreatePostFormProps> = ({ form, setForm, sendImage, allTags }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: files => {
      if (checkImageSize(files[0])) {
        sendImage({ file: files[0], inContent: true });
      }
    }
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
    } else if (checkImageSize(event.target.files[0])) {
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
        <input id="image-input-1" className={styles.invisible} type="file" accept="image/*" />
      </label>
      <input type="text" value={form.title} onChange={handleTitle} placeholder="Enter the title of the article" />
      <div className={styles.content_input_container}>
        <div {...getRootProps({ className: 'dropzone' })} className={styles.addImageArea}>
          <div className={styles.addImageSvg}>
            <AddImageSvg />
          </div>
          <p>
            Drag and drop an image here or
            {' '}
            <p className={styles.uploadRef}>choose image</p>
          </p>
          <input
            {...getInputProps()}
            id="image-input-2"
            className={styles.invisible}
            type="file"
            accept="image/*"
          />
        </div>
        <textarea
          className={styles.content_input}
          value={form.content}
          onChange={handleContent}
          placeholder="Write your post content"
        />
      </div>
      <TagsDropdown onChange={handleTags} data={form.tags} allTags={allTags} />
    </form>
  );
};

export default CreatePostForm;
