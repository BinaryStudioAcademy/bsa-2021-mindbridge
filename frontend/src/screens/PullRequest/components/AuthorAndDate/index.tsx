import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { timeToLocal } from '@helpers/dataTimeToLocalData';
import Image from '@components/Image';
import {defaultAvatar} from "@images/defaultImages";

// eslint-disable-next-line max-len
interface IAuthorAndDateProps {
  className?: string;
  avatar: string;
  nickname: string;
  date: string;
  readTime: string;
  id: string;
}

const AuthorAndDate = (
  { avatar, nickname, className, date, readTime, id }:
  IAuthorAndDateProps
) => (
  <div className={classNames(className, styles.avatar_and_name_group)}>
    <Link to={`/user/${id}`} className={styles.avatar_and_name_group}>
      <Image
        className={styles.avatar}
        src={avatar ?? defaultAvatar}
        alt="avatar"
      />
      <div className={styles.avatar_and_name_group}>
        <span className={styles.user_name}>
          {nickname}
        </span>
      </div>
      {/* <span className={styles.user_name}>*/}
      {/*  @*/}
      {/*  {nickname}*/}
      {/* </span>*/}
    </Link>
    <div className={styles.dot} />
    <span className={styles.date}>{timeToLocal(date)}</span>
    <div className={styles.dot} />
    <span>{readTime}</span>
  </div>
);
export default AuthorAndDate;
