import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Form, Modal } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';
import {
  isValidPassword,
  PASSWORD_MESSAGE, PASSWORDS_NOT_MATCH
} from '@helpers/validation.helper';
import InputPopup from '@components/InputPopup';
import FormButton from '@components/FormButton';
import styles from '@screens/ProfilePage/components/PasswordChangeModal/styles.module.scss';
import { isDeepEqual } from 'react-use/lib/util';
import LoaderWrapper from '@components/LoaderWrapper';
import { IChangePasswordFormRequest } from '@screens/ProfilePage/containers/ProfilePage';
import InputButton from '@screens/Login/components/InputButton';

interface IPasswordChangeModalProps {
  modalInitialState: {
    isPasswordChangeModalOpen: false;
    isPasswordRight: false;
    isChangePasswordFormLoaded: true;
};
  userId: string;
  openPasswordChangeModal: IBindingCallback1<boolean>;
  sendChangePasswordForm: IBindingCallback1<IChangePasswordFormRequest>;
}

const PasswordChangeModal: FunctionComponent<IPasswordChangeModalProps> = ({
  userId,
  openPasswordChangeModal,
  sendChangePasswordForm,
  modalInitialState
}) => {
  const initialData = {
    password: '',
    newPassword: '',
    repeatPassword: ''
  };
  const validationInitialState = {
    isPasswordValid: true,
    isNewPasswordValid: true,
    isPasswordsMatch: true
  };

  const initialInputTypes = {
    passwordInputType: 'password',
    newPasswordInputType: 'password',
    repeatPasswordInputType: 'password'
  };

  const [passwordChangeForm, setPasswordChangeForm] = useState(initialData);
  const [validationData, setValidationData] = useState(validationInitialState);
  const [modalData, setModalData] = useState(modalInitialState);
  const [inputTypes, setInputTypes] = useState(initialInputTypes);

  const validationIntact = useMemo(() => (isDeepEqual(validationInitialState, validationData)),
    [validationInitialState, validationData]);

  useEffect(() => {
    setModalData(modalInitialState);
  }, [modalInitialState]);

  useEffect(() => {
    if (modalData.isPasswordChangeModalOpen === false) {
      setPasswordChangeForm(initialData);
      setValidationData(validationInitialState);
      setInputTypes(initialInputTypes);
    }
  }, [modalData.isPasswordChangeModalOpen]);

  const updatePasswordChangeForm = (fieldId, val) => {
    setPasswordChangeForm(prevState => ({ ...prevState, [fieldId]: val }));
  };

  const handleToggleInput = (fieldId, val) => {
    setInputTypes(prevState => ({ ...prevState, [fieldId]: val === 'text' ? 'password' : 'text' }));
  };

  const updateValidationData = (fieldId, val) => {
    switch (fieldId) {
      case 'isPasswordValid': {
        setValidationData(prevState => ({ ...prevState,
          [fieldId]: isValidPassword(val) }));
        break;
      }
      case 'isNewPasswordValid': {
        setValidationData(prevState => (
          { ...prevState, [fieldId]: isValidPassword(val) }));
        setValidationData(prevState => ({ ...prevState,
          isPasswordsMatch: passwordChangeForm.repeatPassword === val }));
        break;
      }
      case 'isPasswordsMatch': {
        setValidationData(prevState => ({ ...prevState,
          [fieldId]: passwordChangeForm.newPassword === val }));
        break;
      }
      default: break;
    }
  };

  const handleSaveClick = () => {
    sendChangePasswordForm({
      id: userId,
      password: passwordChangeForm.password,
      newPassword: passwordChangeForm.newPassword
    });
  };

  return (
    <Modal
      closeIcon
      onClose={() => openPasswordChangeModal(false)}
      open={modalData.isPasswordChangeModalOpen}
      size="tiny"
    >
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Content>
        <div className={styles.loginForm} style={{ padding: '0' }}>
          <Form
            onSubmit={handleSaveClick}
            warning={!validationData.isPasswordValid
            || !validationData.isNewPasswordValid
            || !validationData.isNewPasswordValid}
          >
            <div className={styles.passwordWrapper}>
              <InputPopup
                id="current_password"
                type={inputTypes.passwordInputType}
                placeholder="Enter your current password"
                value={passwordChangeForm.password}
                setValue={val => updatePasswordChangeForm('password', val)}
                validateValue={val => updateValidationData('isPasswordValid', val)}
                disabled={!modalData.isChangePasswordFormLoaded}
                isValueValid={validationData.isPasswordValid}
                errorMessage={PASSWORD_MESSAGE}
              />
              <InputButton onToggleInput={() => handleToggleInput('passwordInputType',
                inputTypes.passwordInputType)}
              />
            </div>
            <div className={styles.passwordWrapper}>
              <InputPopup
                id="new_password"
                type={inputTypes.newPasswordInputType}
                placeholder="Enter a new password"
                value={passwordChangeForm.newPassword}
                setValue={val => updatePasswordChangeForm('newPassword', val)}
                validateValue={val => updateValidationData('isNewPasswordValid', val)}
                disabled={!modalData.isChangePasswordFormLoaded}
                isValueValid={validationData.isNewPasswordValid}
                errorMessage={PASSWORD_MESSAGE}
              />
              <InputButton onToggleInput={() => handleToggleInput('newPasswordInputType',
                inputTypes.newPasswordInputType)}
              />
            </div>
            <div className={styles.passwordWrapper}>
              <InputPopup
                id="confirm_password"
                type={inputTypes.repeatPasswordInputType}
                placeholder="Confirm new password"
                value={passwordChangeForm.repeatPassword}
                setValue={val => updatePasswordChangeForm('repeatPassword', val)}
                validateValue={val => updateValidationData('isPasswordsMatch', val)}
                disabled={!modalData.isChangePasswordFormLoaded}
                isValueValid={validationData.isPasswordsMatch}
                errorMessage={PASSWORDS_NOT_MATCH}
              />
              <InputButton onToggleInput={() => handleToggleInput('repeatPasswordInputType',
                inputTypes.repeatPasswordInputType)}
              />
            </div>
            <div
              className={(!validationIntact || !modalData.isChangePasswordFormLoaded) ? styles.disableFormButton : null}
            >
              <FormButton
                text={modalData.isChangePasswordFormLoaded ? 'Save'
                  : <LoaderWrapper className={styles.buttonLoader} loading={!modalData.isChangePasswordFormLoaded} />}
                inverted
              />
            </div>
          </Form>
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default PasswordChangeModal;
