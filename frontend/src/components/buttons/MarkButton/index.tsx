import React from 'react';
import styles from './styles.module.scss';

const MarkButton = ({ inverted }) => {
  const className = inverted ? styles.markButtonInverted : styles.markButton;

  return (
    <div className={className}>
      <div />
    </div>
  );
};

export default MarkButton;
