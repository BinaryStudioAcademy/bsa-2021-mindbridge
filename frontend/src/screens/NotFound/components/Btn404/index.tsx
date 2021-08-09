import React from 'react';
import { Button } from 'semantic-ui-react';
import style from './styles.module.scss';

const ButtonEmphasis = () => (
  <div>
    <Button onClick={() => window.location.replace('/')} className={style.buttonRight}>Go to homepage</Button>
  </div>
);

export default ButtonEmphasis;
