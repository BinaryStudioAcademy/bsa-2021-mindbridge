import React, { SetStateAction, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ViewSvg from '@root/screens/CreatePost/containers/CreatePostPage/svg/viewSvg';
import ColorlessButton from '@root/components/buttons/ColorlessButton';
import { IBindingAction, IBindingFunction } from '@root/models/Callbacks';
import { Dispatch } from 'react';
import { ChangeEventHandler } from 'react';
import { MouseEventHandler } from 'react';

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
        {handleCheckbox &&
          <div className={styles.see_diff}>
            <div className={styles.see_diff} >See difference</div>
            <span onClick={handleCheckbox}>
              <input type="checkbox" checked={seeDiff} />
              <div>✔</div>
            </span>
          </div>
        }
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
