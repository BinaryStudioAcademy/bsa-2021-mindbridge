import { useDropzone } from 'react-dropzone';
import styles from './styles.module.scss';
import AddImageSvg from '@components/CreatePostForm/svg/addImageSvg';
import React from 'react';

const DropZoneComponent = ({ sendImage }) => {
  const { getRootProps, getInputProps } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: files => sendImage({ file: files[0], inContent: true })
  });

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })} className={styles.addImageArea}>
        <div className={styles.addImageSvg}>
          <AddImageSvg />
        </div>
        <p>
          Drag and drop an image here or choose image
        </p>
        <input {...getInputProps()} id="image-input-2" className={styles.invisible} type="file" />
      </div>
    </div>
  );
};

export default DropZoneComponent;
