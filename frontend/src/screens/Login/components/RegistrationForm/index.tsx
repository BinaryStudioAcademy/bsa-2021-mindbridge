/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import PasswordInput from '@screens/Login/components/PasswordInput';
import FormButton from '@screens/Login/components/FormButton';

export interface IRegistrationFormProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}

const RegistrationForm: React.FC<IRegistrationFormProps> = (
  { children }
) => (
  <div className={styles.loginForm}>
    <h2 className={styles.title}>Sign Up</h2>
    <form>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" placeholder="Enter your name" required />
      <label htmlFor="surname">Surname</label>
      <input id="surname" type="text" placeholder="Enter your surname" required />
      <label htmlFor="nickname">Nickname</label>
      <input id="nickname" type="text" placeholder="Enter your nickname" required />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" placeholder="Enter your email" required />
      <label htmlFor="password">Password</label>
      <PasswordInput idName="password" />
      <label htmlFor="passwordConfirm">Confirm password</label>
      <PasswordInput idName="passwordConfirm" />
      <FormButton text="Sign In" inverted />
    </form>
  </div>
);

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
