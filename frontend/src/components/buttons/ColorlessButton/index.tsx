import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

// eslint-disable-next-line max-len
interface IFormButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  content: any;
}

const ColorlessButton = ({ className, content, ...props }: IFormButtonProps) => (
  <button
    type="button"
    className={classNames(styles.button, className)}
    {...props}
  >
    {content}
  </button>
);

export default ColorlessButton;
