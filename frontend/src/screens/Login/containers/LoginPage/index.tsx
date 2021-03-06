import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from '../styles.module.scss';
import { connect } from 'react-redux';
import LoginForm from '@screens/Login/components/LoginForm';
import LogoSvg from '@screens/Login/components/svgs/LogoSvg';
import { IBindingAction } from '@models/Callbacks';
import { loginRoutine } from '@screens/Login/routines';
import { IAppState } from '@models/AppState';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginProps {
  isAuthorized: boolean;
  isLoginFailure: boolean;
  loginUser: IBindingAction;
}

const LoginPage: React.FC<ILoginProps> = (
  { loginUser: login,
    isAuthorized }
) => (
  isAuthorized
    ? <Redirect to="/" />
    : (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.loginFormWrapper}>
            <LoginForm login={login} />
          </div>
          <footer>
            <span>
              No account?
              {' '}
              <Link to="/registration">Sign Up</Link>
            </span>
          </footer>
        </div>
        <div className={styles.rightSide}>
          <LogoSvg />
        </div>
      </div>
    )
);

const mapStateToProps = (state: IAppState) => {
  const { auth, requests } = state.auth;
  return ({
    isAuthorized: auth.isAuthorized,
    /* isLoginLoading: requests.loginRequest.loading,*/
    isLoginFailure: requests.loginRequest.error != null && !requests.loginRequest.loading
  });
};

const mapDispatchToProps = {
  loginUser: loginRoutine.trigger
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
