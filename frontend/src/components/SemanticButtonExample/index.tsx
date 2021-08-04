import React from 'react';
import styles from './styles.module.scss';
import { Button, ButtonProps } from 'semantic-ui-react';
import classNames from 'classnames';

export interface ISemanticButtonExampleProps extends ButtonProps {
}

const SemanticButtonExample: React.FC<ISemanticButtonExampleProps> = ({ className, ...props }) => (
  <Button className={classNames(styles.button, className)} {...props} />
);

export default SemanticButtonExample;
