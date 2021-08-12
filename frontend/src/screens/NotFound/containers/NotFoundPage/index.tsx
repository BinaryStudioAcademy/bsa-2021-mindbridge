/* eslint-disable max-len */
import React from 'react';
import styles from './styles.module.scss';
import ButtonEmphasis from '@screens/NotFound/components/Btn404';
import NotFoundSVG from '@screens/NotFound/components/svg/404SVG';

export const NotFoundPage: React.FC = () => (
  <div className={styles.main_container}>
    <NotFoundSVG />
    <div className={styles.text}>Oops... We can’t find this page</div>
    <div className={styles.button}>
      <ButtonEmphasis />
    </div>
  </div>
);

export default NotFoundPage;
