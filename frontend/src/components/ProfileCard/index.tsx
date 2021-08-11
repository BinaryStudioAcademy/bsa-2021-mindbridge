/* eslint-disable max-len */
import React, { FunctionComponent, useState } from 'react';
import { Card, Feed, Container, Form } from 'semantic-ui-react';
import styles from './styles.module.scss';
import EditSvg from '@screens/ProfilePage/containers/ProfilePage/svg/editSvg';
import FormButton from '@components/FormButton';
import BellSvg from '@screens/Header/containers/HeaderPage/svg/bellSvg';
import NotificationCount from '@components/NotificationCount';
import PencilSvg from '@screens/ProfilePage/containers/ProfilePage/svg/pencilSvg';

interface IProfileCardProps {
  /* post: IPost;*/
}
const ProfileCard: FunctionComponent<IProfileCardProps> = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('Charlie');
  const [surname, setSurname] = useState('Culhane');
  const [password, setPassword] = useState('');

  const passwordChanged = data => {
    setPassword(data);
  };

  const nameChanged = data => {
    setName(data);
  };

  const surnameChanged = data => {
    setSurname(data);
  };

  const toggleEditName = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className={styles.viewCard}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <div className={styles.contentWrp}>
        <div className={styles.avatarWrp}>
          <div className={styles.imgContainer}>
            <img
              className={styles.avatar}
              src="https://www.unizwa.edu.om/index1/staff-icon.png"
              alt="avatar"
            />
            <div className={styles.overlay}>
              <a href="/" className={styles.icon} title="Change avatar">
                <EditSvg />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.inputWrp}>
              { isEdit ? (
                <div style={{ display: 'flex' }}>
                  <input
                    className={styles.headerInput}
                    id="name"
                    type="text"
                    name="form-field-name"
                    defaultValue={name}
                    onChange={ev => nameChanged(ev.target.value)}
                  />
                  <input
                    className={styles.headerInput}
                    id="surname"
                    type="text"
                    name="form-field-surname"
                    defaultValue={surname}
                    onChange={ev => surnameChanged(ev.target.value)}
                  />
                </div>
              )
                : (
                  <span className={styles.name}>
                    {name}
                    {' '}
                    {surname}
                  </span>
                )}
              <button className={styles.editButton} type="button" onClick={toggleEditName}>
                <PencilSvg />
              </button>
            </div>
            <span className={styles.nickname}>
              @culhane_cool
            </span>
            <span className={styles.period}>
              on the MindBridge 6 years 9 months
            </span>
          </div>
          <div className={styles.loginForm}>
            <h2 className={styles.title}>Personal data</h2>
            <Form>
              <label htmlFor="nickname">Nickname</label>
              <input
                id="nickname"
                type="text"
                defaultValue="culhane_cool"
                placeholder="Enter your nickname"
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value="charlie_chulhane@gmail.com"
                placeholder="Enter your email"
                disabled
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
              <label htmlFor="new_password">New password</label>
              <input
                id="new_password"
                type="password"
                placeholder="Enter new password"
              />
              <label htmlFor="confirm_password">Confirm password</label>
              <input
                id="confirm_password"
                type="password"
                placeholder="Confirm new password"
              />
              <FormButton text="Save" inverted />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
