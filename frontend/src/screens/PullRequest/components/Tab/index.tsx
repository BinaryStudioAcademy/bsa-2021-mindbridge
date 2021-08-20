import React, { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ViewSvg from '@root/screens/CreatePost/containers/CreatePostPage/svg/viewSvg';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import { Checkbox } from 'semantic-ui-react';

// eslint-disable-next-line max-len
interface ITabProps {
  className?: string;
  previewContent: any;
  diffContent: any;
  setShowDifference: any;
}

const Tab = ({ className, previewContent, diffContent, setShowDifference }: ITabProps) => {
  const [preview, setPreview] = useState(false);
  const setMode = () => {
    setPreview(!preview);
  };

  const handleClickButton = () => {
    setShowDifference();
  };

  return (
    <div className={classNames(styles.tab, className)}>
      <div className={styles.buttons}>
        <input type="checkbox" className={styles.seeDiff} onChange={handleClickButton} />
        <ColorlessButton
          className={classNames(styles.diffButton, !preview && styles.active)}
          onClick={setMode}
          content="Raw"
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
