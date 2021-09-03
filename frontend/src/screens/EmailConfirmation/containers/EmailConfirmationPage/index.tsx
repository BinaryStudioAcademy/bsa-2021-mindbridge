import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const EmailConfirmation: React.FC = () => (
  <div className={styles.text}>
    <h1>Please confirm your email</h1>
    {/* eslint-disable-next-line max-len */}
    <h3>We have sent you an email with the instructions on how to activate your email. Please check your inbox or spam.</h3>
  </div>
);

export default EmailConfirmation;
