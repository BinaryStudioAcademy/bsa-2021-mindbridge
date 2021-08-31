import React, { useState, MouseEventHandler } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import Checkbox from '../Checkbox';

// eslint-disable-next-line max-len
interface ITabProps {
  className?: string;
  previewContent: any;
  diffContent: any;
  seeDiff?: boolean;
  handleCheckbox?: MouseEventHandler<HTMLSpanElement>;
}

const Tab = ({ className, previewContent, diffContent, seeDiff, handleCheckbox }: ITabProps) => {
  const [preview, setPreview] = useState(false);
  const [isCheckboxShowed, setIsCheckboxShowed] = useState(true);
  const setMode = () => {
    setPreview(!preview);
    setIsCheckboxShowed(!isCheckboxShowed);
  };
  return (
    <div className={classNames(styles.tab, className)}>
      <div className={styles.buttons}>
        {handleCheckbox
          && (
          <Checkbox handleCheckbox={handleCheckbox} seeDiff={seeDiff} />
          )}
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
