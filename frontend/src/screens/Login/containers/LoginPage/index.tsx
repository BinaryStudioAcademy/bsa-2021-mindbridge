import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import LoginForm from '@screens/Login/components/LoginForm';
import RegistrationForm from '@screens/Login/components/RegistrationForm';
import LogoSvg from '@screens/Login/components/svgs/LogoSvg';

export interface ILoginProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}

const Login: React.FC<ILoginProps> = (
  { children }
) => {
  const { pathname } = useLocation();

  const getScreen = path => {
    switch (path) {
      case '/login': {
        return [
          <div className={styles.loginFormWrapper}>
            <LoginForm />
          </div>,
          <footer>
            <span>
              No account?
              <a href="/registration">Sign Up</a>
            </span>
          </footer>];
      }
      case '/registration': {
        return [
          <div className={styles.loginFormWrapper}>
            <RegistrationForm />
          </div>,
          <footer>
            <span>
              Already have an account?
              <a href="/login">Sign In</a>
            </span>
          </footer>];
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        {getScreen(pathname)}
      </div>
      <div className={styles.rightSide}>
        <LogoSvg />
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
