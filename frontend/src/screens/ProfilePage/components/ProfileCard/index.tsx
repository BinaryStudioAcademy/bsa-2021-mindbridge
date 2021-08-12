/* eslint-disable max-len */
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Form } from 'semantic-ui-react';
import styles from './styles.module.scss';
import EditSvg from '@screens/ProfilePage/containers/ProfilePage/svg/editSvg';
import FormButton from '@components/FormButton';
import PencilSvg from '@screens/ProfilePage/containers/ProfilePage/svg/pencilSvg';
import { useSelector } from 'react-redux';
import { IAppState } from '@models/AppState';
import { getHowLong } from '@helpers/date.helper';
import {
  isValidNameSurname,
  isValidNickname,
  NAME_MESSAGE,
  NICKNAME_MESSAGE
} from '@helpers/validation.helper';
import InputPopup from '@components/InputPopup';
import { isDeepEqual } from 'react-use/lib/util';
import { IBindingCallback1 } from '@models/Callbacks';
import { IProfileFormRequest } from '@screens/ProfilePage/containers/ProfilePage';

interface IProfileCardProps {
  initialData: {
  nickname: '';
  avatar: '';
  email: '';
  firstName: '';
  lastName: '';
};
  sendForm: IBindingCallback1<IProfileFormRequest>;
}
const ProfileCard: FunctionComponent<IProfileCardProps> = ({ initialData, sendForm }) => {
  const { currentUser } = useSelector((state: IAppState) => ({
    currentUser: state.auth.auth.user
  }));

  const [userForm, setUserForm] = useState(initialData);
  const [isEditName, setIsEditName] = useState(false);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isSurnameValid, setIsSurnameValid] = useState(true);

  const formIntact = useMemo(() => isDeepEqual(initialData, userForm), [initialData, userForm]);

  useEffect(() => {
    setUserForm(initialData);
  }, [initialData]);

  const updateForm = (fieldId, val) => {
    if (val === '') {
      setUserForm(prevState => ({ ...prevState, [fieldId]: null }));
    } else {
      setUserForm(prevState => ({ ...prevState, [fieldId]: val }));
    }
  };

  const toggleEditName = () => {
    setIsEditName(!isEditName);
  };

  const handleImgChange = (event: any) => {
    if (event.target.files[0]) {
      updateForm('avatar', URL.createObjectURL(event.target.files[0]));
    }
  };

  const validateName = (newName?: string) => setIsNameValid(
    isValidNameSurname(typeof newName === 'string' ? newName : userForm.firstName)
  );

  const validateSurname = (newName?: string) => setIsSurnameValid(
    isValidNameSurname(typeof newName === 'string' ? newName : userForm.lastName)
  );

  const validateNickname = (newName?: string) => setIsNicknameValid(
    isValidNickname(typeof newName === 'string' ? newName : userForm.nickname)
  );

  const isRequiredFieldsValid = (): boolean => isValidNickname(userForm.nickname) && isValidNameSurname(userForm.firstName)
    && isValidNameSurname(userForm.lastName);

  const handleSaveClick = e => {
    e.preventDefault();
    if (isRequiredFieldsValid) {
      sendForm(userForm);
    }
  };

  return (
    <div className={styles.viewCard}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <div className={styles.contentWrp}>
        <div className={styles.avatarWrp}>
          <div className={styles.imgContainer}>
            {userForm.avatar == null ? (
              <img
                className={styles.avatar}
                src="https://www.unizwa.edu.om/index1/staff-icon.png"
                alt="avatar"
              />
            ) : (
              <img
                className={styles.avatar}
                src={userForm.avatar}
                alt="avatar"
              />
            )}

            <div className={styles.overlay}>
              <div className={styles.icon} title="Change avatar">
                <label className={styles.file_input_rectangle} htmlFor="image-input-1" onChange={handleImgChange}>
                  <EditSvg />
                  <input id="image-input-1" className={styles.invisible} type="file" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.inputWrp}>
              { isEditName ? (
                <div className={styles.loginForm} style={{ display: 'flex' }}>
                  <InputPopup
                    id="name"
                    type="text"
                    placeholder="Enter your first name"
                    value={userForm.firstName}
                    setValue={val => updateForm('firstName', val)}
                    validateValue={validateName}
                    isValueValid={isNameValid}
                    errorMessage={NAME_MESSAGE}
                  />
                  <InputPopup
                    id="surname"
                    type="text"
                    placeholder="Enter your last name"
                    value={userForm.lastName}
                    setValue={val => updateForm('lastName', val)}
                    validateValue={validateSurname}
                    isValueValid={isSurnameValid}
                    errorMessage={NAME_MESSAGE}
                  />
                </div>
              )
                : (
                  <div>
                    <span className={styles.name}>
                      {userForm.firstName}
                      {' '}
                      {userForm.lastName}
                    </span>
                    <button className={styles.editButton} type="button" onClick={toggleEditName}>
                      <PencilSvg />
                    </button>
                  </div>
                )}
            </div>
            <span className={styles.period}>
              {getHowLong(currentUser.createdAt)}
            </span>
          </div>
          <div className={styles.loginForm}>
            <h2 className={styles.title}>Personal data</h2>
            <Form
              onSubmit={handleSaveClick}
              warning={!isNameValid || !isSurnameValid || !isNicknameValid}
            >
              <label htmlFor="nickname">Nickname</label>
              <InputPopup
                id="nickname"
                type="text"
                placeholder="Enter your nickname"
                value={userForm?.nickname || null}
                setValue={val => updateForm('nickname', val)}
                validateValue={validateNickname}
                isValueValid={isNicknameValid}
                errorMessage={NICKNAME_MESSAGE}
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                defaultValue={userForm.email}
                placeholder="Enter your email"
                disabled
              />
              <div className={(formIntact && isRequiredFieldsValid) ? styles.disableFormButton : null}>
                <FormButton text="Save" inverted />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
