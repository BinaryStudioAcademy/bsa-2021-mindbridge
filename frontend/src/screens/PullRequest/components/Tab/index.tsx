import React, { MouseEventHandler, useState } from 'react';
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
  seeDiff?: boolean;
  handleSeeDifference?: MouseEventHandler<HTMLSpanElement>;
}

const Tab = ({ className, previewContent, diffContent, seeDiff, handleSeeDifference }: ITabProps) => {
  const [preview, setPreview] = useState(false);
  const [isCheckboxShowed, setIsCheckboxShowed] = useState(true);
  const setMode = () => {
    setPreview(!preview);
    setIsCheckboxShowed(!isCheckboxShowed);
  };

  return (
    <div className={classNames(styles.tab, className)}>
      <div className={styles.buttons}>
        {handleSeeDifference && isCheckboxShowed
        && (
          <div className={styles.see_diff}>
            <div className={styles.see_diff}>See difference</div>
            <span>
              <input type="checkbox" checked={seeDiff} />
              {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
              jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div onClick={handleSeeDifference}>✔</div>
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
