import React from 'react';
import { Button } from 'semantic-ui-react';
import style from './styles.module.scss';
import { history } from '@helpers/history.helper';

const ButtonEmphasis = () => (
  <div>
    <Button onClick={() => history.push('/')} className={style.buttonRight}>Go to homepage</Button>
  </div>
);

export default ButtonEmphasis;
