import React, { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ViewSvg from '@root/screens/CreatePost/containers/CreatePostPage/svg/viewSvg';
import ColorlessButton from '@root/components/buttons/ColorlessButton';

// eslint-disable-next-line max-len
interface ITabProps {
  className?: string;
  previewContent: any;
  diffContent: any;
}

const Tab = ({ className, previewContent, diffContent }: ITabProps) => {
  const [preview, setPreview] = useState(false);
  const setMode = () => {
    setPreview(!preview);
  };

  return (
    <div className={classNames(styles.tab, className)}>
      <div className={styles.buttons}>
        <ColorlessButton
          className={classNames(styles.diffButton, !preview && styles.active)}
          onClick={setMode}
          content="See difference"
        />
        <ColorlessButton
          className={preview && styles.active}
          onClick={setMode}
          content="Preview"
        />
      </div>
      {preview ? previewContent : diffContent}
    </div>
  );
};

export default Tab;
