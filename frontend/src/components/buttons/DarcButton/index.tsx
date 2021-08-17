import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Button, ButtonProps } from 'semantic-ui-react';

// eslint-disable-next-line max-len
interface IFormButtonProps extends ButtonProps {
  content: any;
}

const DarkButton = ({ className, content, loading, ...props }: IFormButtonProps) => (
  <Button
    className={classNames(styles.dark_button, className)}
    content={content}
    loading={loading}
    {...props}
  />
);

export default DarkButton;
