/* eslint-disable max-len */
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Form } from 'semantic-ui-react';
import styles from './styles.module.scss';
import EditSvg from '@screens/ProfilePage/components/svg/editSvg';
import FormButton from '@components/FormButton';
import PencilSvg from '@screens/ProfilePage/components/svg/pencilSvg';
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
// import { checkImage } from '@helpers/image.helper';
import CrossSvg from '@screens/ProfilePage/components/svg/crossSvg';
import Image from '@components/Image';

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
    savingAvatar: {
      url: '';
      isLoaded: true;
    };
};
  sendForm: IBindingCallback1<IProfileFormRequest>;
  sendAvatar: IBindingCallback1<object>;
  sendNickname: IBindingCallback1<string>;
  openPasswordChangeModal: IBindingCallback1<boolean>;
  deleteAvatar: IBindingCallback1<string>;
}
const ProfileCard: FunctionComponent<IProfileCardProps> = (
  {
    initialData,
    initialState,
    sendForm, sendAvatar,
    sendNickname,
    openPasswordChangeModal,
    deleteAvatar
  }
) => {
  const validationInitialState = {
    isNameValid: true,
    isSurnameValid: true,
    isNicknameValid: true
  };

  const [userForm, setUserForm] = useState(initialData);
  const [imgToSave, setImgToSave] = useState(null);
  const [canChangeNick, setCanChangeNick] = useState(true);
  const [isPressEdit, setIsPressEdit] = useState(false);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(false);
  const [profileData, setProfileData] = useState(initialState);
  const [validationData, setValidationData] = useState(validationInitialState);

  const formIntact = useMemo(() => (isDeepEqual(initialData, userForm)), [initialData, userForm]);
  const validationIntact = useMemo(() => (isDeepEqual(validationInitialState, validationData)), [validationInitialState, validationData]);

  useEffect(() => {
    if (userForm.id === '') {
      setUserForm(initialData);
    } else {
      setUserForm(userForm);
    }
  }, [initialData]);

  useEffect(() => {
    setProfileData(initialState);
  }, [initialState]);

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
    if (profileData.isNicknameLoaded && !profileData.isNicknameEngaged) {
      setIsSubmitBlocked(false);
    }
  }, [profileData.isNicknameEngaged, profileData.isNicknameLoaded]);

  useEffect(() => {
    updateForm('avatar', profileData.savingAvatar.url);
  }, [profileData.savingAvatar.url]);

  const handleImgChange = (event: any) => {
    setImgToSave(event.target.files[0]);
    updateForm('avatar', URL.createObjectURL(event.target.files[0]));
  };

  const setDafaultState = () => {
    setProfileData(initialState);
    setUserForm(initialData);
    setValidationData(validationInitialState);
    setIsPressEdit(false);
    setImgToSave(null);
    setCanChangeNick(true);
    setIsSubmitBlocked(false);
  };

  const handleImgDelete = () => {
    deleteAvatar(userForm.id);
    setDafaultState();
  };

  const handleOnBlur = val => {
    if (val !== initialData.nickname && validationData.isNicknameValid) {
      sendNickname(val);
    } else {
      setCanChangeNick(true);
      setIsSubmitBlocked(false);
    }
  };

  const handleChangePasswordClick = () => {
    openPasswordChangeModal(true);
    setDafaultState();
  };

  const handleSaveClick = () => {
    if (userForm.avatar !== initialData.avatar) {
      sendAvatar({
        avatar: imgToSave,
        userId: userForm.id
      });
    }
    sendForm(userForm);
    setCanChangeNick(true);
    setIsPressEdit(false);
  };

  return (
    <div className={styles.viewCard}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      {userForm.id !== ''
        ? (
          <div className={styles.contentWrp}>
            <div className={styles.avatarWrp}>
              <div className={styles.imgContainer}>
                {(userForm.avatar == null || userForm.avatar === '') ? (
                  <Image
                    className={styles.avatar}
                    src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                    alt="avatar"
                  />
                ) : (
                  <Image
                    className={styles.avatar}
                    src={userForm.avatar}
                    alt="avatar"
                  />
                )}
                {profileData.savingAvatar.isLoaded
                  ? (
                    <div className={styles.overlay}>
                      <div className={styles.icon} title="Change avatar">
                        <label className={styles.file_input_rectangle} htmlFor="image-input-1" onChange={handleImgChange}>
                          <EditSvg />
                          <input id="image-input-1" className={styles.invisible} type="file" accept="image/*" />
                        </label>
                        { (profileData.savingAvatar.url !== '') && (
                        <label className={styles.file_input_rectangle} title="Delete avatar">
                          <button className={styles.deleteImgButton} type="button" onClick={handleImgDelete}>
                            <CrossSvg />
                          </button>
                        </label>
                        ) }
                      </div>
                    </div>
                  )
                  : (
                    <div className={styles.overlay} style={{ opacity: '1' }}>
                      <LoaderWrapper className={styles.imgLoader} loading={!profileData.savingAvatar.isLoaded} />
                    </div>
                  )}
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.inputWrp}>
                  {isPressEdit ? (
                    <div
                      className={styles.loginForm}
                      style={{
                        display: 'flex',
                        padding: '0'
                      }}
                    >
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
                        <button
                          className={styles.editButton}
                          type="button"
                          onClick={() => {
                            setIsPressEdit(true);
                          }}
                        >
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
                    onBlur={() => {
                      handleOnBlur(userForm.nickname);
                    }}
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
                  <div
                    className={(formIntact || !validationIntact || !canChangeNick || isSubmitBlocked) ? styles.disableFormButton : null}
                  >
                    <FormButton
                      text={profileData.isFormLoaded ? 'Save'
                        : <LoaderWrapper className={styles.buttonLoader} loading={!profileData.isFormLoaded} />}
                      inverted
                    />
                  </div>
                  <div className={styles.separatorLine} />
                </Form>
                <FormButton
                  text="Change password"
                  onClick={handleChangePasswordClick}
                  inverted
                />
              </div>
            </div>
          </div>
        )
        : <LoaderWrapper className={styles.buttonLoader} loading />}
    </div>
  );
};

export default ProfileCard;
