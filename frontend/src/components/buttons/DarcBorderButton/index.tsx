import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Button, ButtonProps } from 'semantic-ui-react';

interface IFormButtonProps extends ButtonProps {
  content: any;
}

const DarkBorderButton = ({ className, content, loading, ...props }: IFormButtonProps) => (
  <Button
    type="button"
    className={classNames(styles.dark_border_button, className)}
    content={content}
    loading={loading}
    {...props}
  />
);

export default DarkBorderButton;
