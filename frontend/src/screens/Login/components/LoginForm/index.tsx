import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import PasswordInput from '@screens/Login/components/PasswordInput';

export interface ILoginFormProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}

const LoginForm: React.FC<ILoginFormProps> = (
  { children }
) => {

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>Sign In</h2>
      <button className={styles.oauthButton}>Sign in with Google</button>
      <button className={styles.oauthButton}>Sign in with Facebook</button>
      <button className={styles.oauthButton}>Sign in with GitHub</button>

      <div className={styles.separator}>
        <div className={styles.separatorLine}></div>
        or
        <div className={styles.separatorLine}></div>
      </div>

      <form>
        <label htmlFor={"email"}>Email</label>
        <input id={"email"} type="email" placeholder={"Enter your email"} required/>
        <label htmlFor="password">Password <a href="" className={styles.linkTo}>Forget password</a></label>
        <PasswordInput idName={'password'}/>
        <button type={"submit"} className={styles.submitButton}>Sign In</button>
      </form>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
