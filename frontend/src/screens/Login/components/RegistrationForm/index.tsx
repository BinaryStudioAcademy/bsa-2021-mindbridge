import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import { GOOGLE_OAUTH2_URL, FACEBOOK_OAUTH2_URL, GITHUB_OAUTH2_URL } from '@screens/Login/constants/auth_constants';
import { IBindingCallback1 } from '@models/Callbacks';
import { IRegisterRequest } from '@screens/Login/containers/RegisterPage';
import FormButton from '@components/FormButton';
import { Form } from 'semantic-ui-react';

import {
  EMAIL_MESSAGE,
  PASSWORD_MESSAGE,
  PASSWORDS_NOT_MATCH,
  NICKNAME_MESSAGE,
  NAME_MESSAGE,
  SURNAME_MESSAGE,
  isValidEmail,
  isValidPassword,
  isValidNickname,
  isValidNameSurname
} from '@helpers/validation.helper';
import InputPopup from '@components/InputPopup';
import LoaderWrapper from '@components/LoaderWrapper';

interface IRegisterForm {
  register: IBindingCallback1<IRegisterRequest>;
}

const RegistrationForm: FunctionComponent<IRegisterForm> = ({
  register
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isSurnameValid, setIsSurnameValid] = useState(true);
  const [isLoad, setIsLoad] = useState(false);

  const validateEmail = (newName?: string) => setIsEmailValid(
    isValidEmail(typeof newName === 'string' ? newName : email)
  );

  const validateNickname = (newName?: string) => setIsNicknameValid(
    isValidNickname(typeof newName === 'string' ? newName : nickname)
  );

  const validateName = (newName?: string) => setIsNameValid(
    isValidNameSurname(typeof newName === 'string' ? newName : name)
  );

  const validateSurname = (newName?: string) => setIsSurnameValid(
    isValidNameSurname(typeof newName === 'string' ? newName : surname)
  );

  const validatePassword = (newName?: string) => {
    const lastChangeValue = typeof newName === 'string' ? newName : password;
    setIsPasswordValid(isValidPassword(lastChangeValue));
    setIsPasswordsMatch(lastChangeValue === repeatPassword);
  };

  const validateRepeatPassword = (newName?: string) => setIsPasswordsMatch(
    (typeof newName === 'string' ? newName : repeatPassword) === password
  );

  const isRequiredFieldsValid = (): boolean => isValidEmail(email) && isValidPassword(password)
    && isValidNickname(nickname) && isValidNameSurname(name)
    && isValidNameSurname(surname) && password === repeatPassword;

  const handleRegistrClick = e => {
    e.preventDefault();
    if (isRequiredFieldsValid()) {
      // add all fields
      register({ name, surname, nickname, email, password });
      setIsLoad(true);
    }
  };

  return (
    <LoaderWrapper loading={isLoad}>
      <div className={styles.loginForm}>
        <h2 className={styles.title}>Sign Up</h2>
        <Form
          onSubmit={handleRegistrClick}
          warning={!isNameValid || !isSurnameValid || !isNicknameValid
        || !isEmailValid || !isPasswordValid || !isPasswordsMatch}
        >
          <InputPopup
            id="name"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            setValue={setName}
            validateValue={validateName}
            isValueValid={isNameValid}
            errorMessage={NAME_MESSAGE}
          />
          <InputPopup
            id="surname"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            setValue={setSurname}
            validateValue={validateSurname}
            isValueValid={isSurnameValid}
            errorMessage={SURNAME_MESSAGE}
          />
          <InputPopup
            id="nickname"
            type="text"
            label="Nickname"
            placeholder="Enter your nickname"
            setValue={setNickname}
            validateValue={validateNickname}
            isValueValid={isNicknameValid}
            errorMessage={NICKNAME_MESSAGE}
          />
          <InputPopup
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            setValue={setEmail}
            validateValue={validateEmail}
            isValueValid={isEmailValid}
            errorMessage={EMAIL_MESSAGE}
          />
          <InputPopup
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            setValue={setPassword}
            validateValue={validatePassword}
            isValueValid={isPasswordValid}
            errorMessage={PASSWORD_MESSAGE}
          />
          <InputPopup
            id="passwordConfirm"
            type="password"
            label="Repeat password"
            placeholder="Repeat your password"
            setValue={setRepeatPassword}
            validateValue={validateRepeatPassword}
            isValueValid={isPasswordsMatch}
            errorMessage={PASSWORDS_NOT_MATCH}
          />
          <FormButton text="Sign Up" inverted />
        </Form>

        <div className={styles.separator}>
          <div className={styles.separatorLine} />
          or
          <div className={styles.separatorLine} />
        </div>

        <a href={GOOGLE_OAUTH2_URL}>
          <FormButton text="Sign Up with Google" inverted={false} />
        </a>
        <a href={FACEBOOK_OAUTH2_URL}>
          <FormButton text="Sign Up with Facebook" inverted={false} />
        </a>
        <a href={GITHUB_OAUTH2_URL}>
          <FormButton text="Sign Up with GitHub" inverted={false} />
        </a>
      </div>
    </LoaderWrapper>
  );
};

export default RegistrationForm;
