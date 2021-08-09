import React, { FunctionComponent } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@screens/Login/constants/auth_constants';
import { Redirect } from 'react-router-dom';
import { loginRoutine } from '@screens/Login/routines';
import { connect } from 'react-redux';
import { IBindingAction } from '@models/Callbacks';

interface IOAuthProps {
  history: any;
  loginUser: IBindingAction;
}

const OAuth2Handler: FunctionComponent<IOAuthProps> = ({
  history,
  loginUser: login
}) => {
  const getUrlParameter = (field: string) => {
    const name = field.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[?&]${name}=([^&#]*)`);

    const results = regex.exec(history.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  const isTokenExtracted = () => {
    const token = getUrlParameter('token');
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, getUrlParameter('token'));
      localStorage.setItem(REFRESH_TOKEN, getUrlParameter('refresh'));
      login();
      return true;
    }
    return false;
  };

  return (
    isTokenExtracted()
      ? (
        <Redirect to="/" />
      )
      : (
        <Redirect to={{
          pathname: '/login',
          state: {
            error: getUrlParameter('error')
          }
        }}
        />
      )
  );
};

const mapDispatchToProps = {
  loginUser: loginRoutine.success
};

export default connect(
  null,
  mapDispatchToProps
)(OAuth2Handler);

