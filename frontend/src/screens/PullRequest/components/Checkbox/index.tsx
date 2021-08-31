import React, { MouseEventHandler } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

// eslint-disable-next-line max-len
interface ICheckboxProps {
  className?: string;
  seeDiff?: boolean;
  handleCheckbox?: MouseEventHandler<HTMLSpanElement>;
}

const Checkbox = ({ seeDiff, handleCheckbox, className }: ICheckboxProps) => {
  return (
    <div className={classNames(styles.see_diff, className )}>
      <div className={styles.see_diff}>See difference</div>
      <span>
        <input type="checkbox" checked={seeDiff} />
        {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
              jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div onClick={handleCheckbox} />
      </span>
    </div>
  );
};

export default Checkbox;