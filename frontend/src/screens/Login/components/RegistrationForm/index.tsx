import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import { GOOGLE_OAUTH2_URL, FACEBOOK_OAUTH2_URL, GITHUB_OAUTH2_URL } from '@screens/Login/constants/auth_constants';
import { IBindingCallback1 } from '@models/Callbacks';
import { IRegisterRequest } from '@screens/Login/containers/RegisterPage';
import FormButton from '@components/FormButton';
import { Form, Message } from 'semantic-ui-react';

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
    if (isRequiredFieldsValid) {
      // add all fields
      register({ name, surname, nickname, email, password });
    }
  };
  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>Sign Up</h2>
      <Form
        onSubmit={handleRegistrClick}
        warning={!isNameValid || !isSurnameValid || !isNicknameValid
        || !isEmailValid || !isPasswordValid || !isPasswordsMatch}
      >
        <Form.Input
          id="name"
          type="text"
          label="FirstName"
          placeholder="Enter your name"
          required
          onChange={e => { setName(e.target.value); validateName(e.target.value); }}
          error={!isNameValid}
          onBlur={validateName}
        />
        <Form.Input
          id="surname"
          type="text"
          label="LastName"
          placeholder="Enter your surname"
          required
          onChange={e => { setSurname(e.target.value); validateSurname(e.target.value); }}
          error={!isSurnameValid}
          onBlur={validateSurname}
        />
        <Form.Input
          id="nickname"
          type="text"
          label="Nickname"
          placeholder="Enter your nickname"
          required
          onChange={e => { setNickname(e.target.value); validateNickname(e.target.value); }}
          error={!isNicknameValid}
          onBlur={validateNickname}
        />
        <Form.Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          onChange={e => { setEmail(e.target.value); validateEmail(e.target.value); }}
          error={!isEmailValid}
          onBlur={validateEmail}
        />
        <Form.Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          onChange={e => { setPassword(e.target.value); validatePassword(e.target.value); }}
          error={!isPasswordValid}
          onBlur={validatePassword}
        />
        {/* <label htmlFor="password">Password</label>
        <PasswordInput idName="password" />*/}
        <Form.Input
          id="passwordConfirm"
          label="Repeat password"
          type="password"
          placeholder="Repeat your password"
          required
          onChange={e => { setRepeatPassword(e.target.value); validateRepeatPassword(e.target.value); }}
          error={!isPasswordsMatch}
          onBlur={validateRepeatPassword}
        />
        <Message
          warning
          list={[
            !isEmailValid && EMAIL_MESSAGE,
            !isPasswordValid && PASSWORD_MESSAGE,
            !isPasswordsMatch && PASSWORDS_NOT_MATCH,
            !isNicknameValid && NICKNAME_MESSAGE,
            !isNameValid && NAME_MESSAGE,
            !isSurnameValid && SURNAME_MESSAGE
          ]}
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
  );
};

export default RegistrationForm;
