/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import PasswordInput from '@screens/Login/components/PasswordInput';
import FormButton from '@screens/Login/components/FormButton';
import { Link } from 'react-router-dom';

export interface ILoginFormProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}

const LoginForm: React.FC<ILoginFormProps> = (
  { children }
) => (
  <div className={styles.loginForm}>
    <h2 className={styles.title}>Sign In</h2>
    <FormButton text="Sign in with Google" inverted={false} />
    <FormButton text="Sign in with Facebook" inverted={false} />
    <FormButton text="Sign in with GitHub" inverted={false} />

    <div className={styles.separator}>
      <div className={styles.separatorLine} />
      or
      <div className={styles.separatorLine} />
    </div>

    <form>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" placeholder="Enter your email" required />
      <label htmlFor="password">
        Password
        <Link to="/forgot" className={styles.linkTo}>Forgot password</Link>
      </label>
      <PasswordInput idName="password" />
      <FormButton text="Sign In" inverted />
    </form>
  </div>
);

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
