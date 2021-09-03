import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const EmailConfirmation: React.FC = () => (
  <div className={classNames('content_wrapper', styles.container)}>
    <div className={styles.text}>
      Oops... Your email not confirmed
      <p>Please confirm you&apos;re email</p>
    </div>
  </div>
);

export default EmailConfirmation;
