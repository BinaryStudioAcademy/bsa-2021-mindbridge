import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { timeToLocal } from '@helpers/dataTimeToLocalData';

// eslint-disable-next-line max-len
interface IAuthorAndDateProps {
  className?: string;
  avatar: string;
  nickname: string;
  lastName: string;
  firstName: string;
  date: string;
  readTime: string;
}

const AuthorAndDate = ({ avatar, nickname, lastName, firstName, className, date, readTime }: IAuthorAndDateProps) => (
  <div className={classNames(className, styles.avatar_and_name_group)}>
    <img
      className={styles.avatar}
      src={avatar ?? 'https://i.imgur.com/LaWyPZF.png'}
      alt="avatar"
    />
    {firstName
      && (
      <div className={styles.avatar_and_name_group}>
        <span className={styles.user_name}>
          {firstName}
          {' '}
          {lastName}
        </span>
        <div className={styles.dot} />
      </div>
      )}
    <span className={styles.user_name}>
      @
      {nickname}
    </span>
    <div className={styles.dot} />
    <span className={styles.date}>{timeToLocal(date)}</span>
    <div className={styles.dot} />
    <span>{readTime}</span>
  </div>
);
export default AuthorAndDate;
