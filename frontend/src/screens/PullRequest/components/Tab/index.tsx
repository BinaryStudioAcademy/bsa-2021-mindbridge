import React, { useState, MouseEventHandler } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ColorlessButton from '@root/components/buttons/ColorlessButton';

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
  const setMode = () => {
    setPreview(!preview);
  };

  return (
    <div className={classNames(styles.tab, className)}>
      <div className={styles.buttons}>
        {handleCheckbox
          && (
          <div className={styles.see_diff}>
            <div className={styles.see_diff}>See difference</div>
            <span>
              <input type="checkbox" checked={seeDiff} />
              {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
              jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div onClick={handleCheckbox}>✔</div>
            </span>
          </div>
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
