/* eslint-disable max-len */
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Form } from 'semantic-ui-react';
import styles from './styles.module.scss';
import EditSvg from '@screens/ProfilePage/containers/ProfilePage/svg/editSvg';
import FormButton from '@components/FormButton';
import PencilSvg from '@screens/ProfilePage/containers/ProfilePage/svg/pencilSvg';
import { getHowLong } from '@helpers/date.helper';
import {
  isValidNameSurname,
  isValidNickname,
  NAME_MESSAGE, NICKNAME_ENGAGED_MESSAGE,
  NICKNAME_MESSAGE
} from '@helpers/validation.helper';
import InputPopup from '@components/InputPopup';
import { isDeepEqual } from 'react-use/lib/util';
import { IBindingCallback1 } from '@models/Callbacks';
import { IProfileFormRequest } from '@screens/ProfilePage/containers/ProfilePage';
import LoaderWrapper from '@components/LoaderWrapper';

interface IProfileCardProps {
  initialData: {
  id: '';
  nickname: '';
  avatar: '';
  email: '';
  firstName: '';
  lastName: '';
  createdAt: '';
};
  initialState: {
    isNicknameEngaged: false;
    isFormLoaded: true;
    isNicknameLoaded: true;
};
  sendForm: IBindingCallback1<IProfileFormRequest>;
  sendNickname: IBindingCallback1<string>;
}
const ProfileCard: FunctionComponent<IProfileCardProps> = (
  { initialData, initialState, sendForm, sendNickname }
) => {
  const validationInitialState = {
    isNameValid: true,
    isSurnameValid: true,
    isNicknameValid: true
  };

  const [userForm, setUserForm] = useState(initialData);
  const [canChangeNick, setCanChangeNick] = useState(true);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(false);
  const [profileData, setProfileData] = useState(initialState);
  const [validationData, setValidationData] = useState(validationInitialState);
  const [isEditName, setIsEditName] = useState(false);

  const formIntact = useMemo(() => (isDeepEqual(initialData, userForm)), [initialData, userForm]);
  const validationIntact = useMemo(() => (isDeepEqual(validationInitialState, validationData)), [validationInitialState, validationData]);

  useEffect(() => {
    if (userForm.email === '') {
      setUserForm(initialData);
    } else {
      setUserForm(userForm);
    }
  }, [initialData]);

  useEffect(() => {
    setProfileData(initialState);
  }, [initialState]);

  const updateValidationData = (fieldId, val) => {
    if (fieldId === 'isNameValid' || fieldId === 'isSurnameValid') {
      setValidationData(prevState => ({ ...prevState,
        [fieldId]: isValidNameSurname(val) }));
    } else if (fieldId === 'isNicknameValid') {
      setValidationData(prevState => ({ ...prevState,
        [fieldId]: isValidNickname(val) }));
    }
  };

  useEffect(() => {
    if (profileData.isNicknameEngaged && userForm.nickname !== initialData.nickname) {
      setCanChangeNick(false);
    } else {
      setCanChangeNick(true);
    }
  }, [profileData.isNicknameEngaged]);

  const updateForm = (fieldId, val) => {
    if (fieldId === 'nickname') {
      setIsSubmitBlocked(true);
    }
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

  const handleOnBlur = val => {
    if (val !== initialData.nickname && validationData.isNicknameValid) {
      sendNickname(val);
      setIsSubmitBlocked(false);
    } else {
      setCanChangeNick(true);
    }
  };

  const handleSaveClick = e => {
    sendForm(userForm);
    setCanChangeNick(true);
  };

  return (
    <div className={styles.viewCard}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <div className={styles.contentWrp}>
        <div className={styles.avatarWrp}>
          <div className={styles.imgContainer}>
            {(userForm.avatar == null || userForm.avatar === '') ? (
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
                <div className={styles.loginForm} style={{ display: 'flex', padding: '0' }}>
                  <InputPopup
                    className={styles.nameSurnameInput}
                    id="name"
                    type="text"
                    placeholder="Enter your first name"
                    value={userForm.firstName}
                    setValue={val => updateForm('firstName', val)}
                    validateValue={val => updateValidationData('isNameValid', val)}
                    isValueValid={validationData.isNameValid}
                    disabled={!profileData.isFormLoaded}
                    errorMessage={NAME_MESSAGE}
                  />
                  <InputPopup
                    className={styles.nameSurnameInput}
                    id="surname"
                    type="text"
                    placeholder="Enter your last name"
                    value={userForm.lastName}
                    setValue={val => updateForm('lastName', val)}
                    validateValue={val => updateValidationData('isSurnameValid', val)}
                    isValueValid={validationData.isSurnameValid}
                    disabled={!profileData.isFormLoaded}
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
              {getHowLong(userForm.createdAt)}
            </span>
          </div>
          <div className={styles.loginForm}>
            <h2 className={styles.title}>Personal data</h2>
            <Form
              onSubmit={handleSaveClick}
              warning={!validationData.isNameValid || !validationData.isSurnameValid || !validationData.isNicknameValid}
            >
              <label htmlFor="nickname">Nickname</label>
              <InputPopup
                id="nickname"
                type="text"
                loading={!profileData.isNicknameLoaded}
                placeholder="Enter your nickname"
                value={userForm?.nickname || null}
                setValue={val => updateForm('nickname', val)}
                validateValue={val => updateValidationData('isNicknameValid', val)}
                onBlur={() => { handleOnBlur(userForm.nickname); }}
                isValueValid={validationData.isNicknameValid && canChangeNick}
                disabled={!profileData.isFormLoaded}
                errorMessage={!canChangeNick ? NICKNAME_ENGAGED_MESSAGE : NICKNAME_MESSAGE}
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                defaultValue={userForm.email}
                placeholder="Enter your email"
                disabled
              />
              <div className={(formIntact || !validationIntact || !canChangeNick || isSubmitBlocked) ? styles.disableFormButton : null}>
                <FormButton text={profileData.isFormLoaded ? 'Save' : <LoaderWrapper className={styles.buttonLoader} loading={!profileData.isFormLoaded} />} inverted />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
