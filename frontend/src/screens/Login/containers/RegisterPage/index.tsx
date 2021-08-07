import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from '../styles.module.scss';
import { connect } from 'react-redux';
import RegistrationForm from '@screens/Login/components/RegistrationForm';
import LogoSvg from '@screens/Login/components/svgs/LogoSvg';
import { IBindingAction } from '@models/Callbacks';
import { registerRoutine } from '@screens/Login/routines';
import { IAppState } from '@models/AppState';
import { toastr } from 'react-redux-toastr';

export interface IRegisterRequest {
  name: string;
  surname: string;
  nickname: string;
  email: string;
  password: string;
}

export interface IRegisterProps {
  isAuthorized: boolean;
  isRegisterFailure: boolean;
  registerUser: IBindingAction;
  error: string;
}

const RegistrationPage: React.FC<IRegisterProps> = (
  { registerUser: register,
    isAuthorized,
    isRegisterFailure,
    error }
) => (
  isAuthorized
    ? <Redirect to="/create/post" />
    : (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.loginFormWrapper}>
            {isRegisterFailure && (toastr.error('FAILED TO REGISTER', error)
            )}
            <RegistrationForm register={register} />
          </div>
          <footer>
            <span>
              Already have an account?
              <Link to="/login"> Sign In</Link>
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
    /* isRegisterLoading: requests.registerRequest.loading,*/
    isRegisterFailure: requests.registerRequest.error != null && !requests.registerRequest.loading,
    error: requests.registerRequest.error || 'Something went wrong. Please try again.'
  });
};

const mapDispatchToProps = {
  registerUser: registerRoutine.trigger
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage);
