import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import { timeToLocal } from '@helpers/dataTimeToLocalData';

// eslint-disable-next-line max-len
interface IAuthorAndDateProps {
  className?: string;
  avatar: string;
  nickname: string;
  date: string;
}

const AuthorAndDate = ({ avatar, nickname, className, date }: IAuthorAndDateProps) => {

  return (
    <div className={classNames(className, styles.avatar_and_name_group)}>
      <Link to="/">
          <img
            className={styles.avatar}
            src={ avatar ?? 'https://i.imgur.com/LaWyPZF.png'}
            alt="avatar"
          />
          <div className={styles.dot} />
          <span className={styles.user_name}>{nickname}</span>
          <div className={styles.dot} />
          <span className={styles.date}>{timeToLocal(date)}</span>
        </Link>
    </div>
  )
}
export default AuthorAndDate;