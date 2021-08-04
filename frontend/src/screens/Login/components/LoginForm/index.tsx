import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';
import { GOOGLE_OAUTH2_URL, FACEBOOK_OAUTH2_URL, GITHUB_OAUTH2_URL } from '@screens/Login/constants/auth_constants';
import PasswordInput from '@screens/Login/components/PasswordInput';
import FormButton from '@screens/Login/components/FormButton';
import { IBindingCallback1 } from '@models/Callbacks';
import { ILoginRequest } from '@screens/Login/containers/LoginPage';
import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface ILoginForm {
  login: IBindingCallback1<ILoginRequest>;
}

const LoginForm: FunctionComponent<ILoginForm> = ({
  login
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChanged = data => {
    setEmail(data);
  };

  const passwordChanged = data => {
    setPassword(data);
  };

  const handleLoginClick = () => {
    login({ email, password });
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>Sign In</h2>
      <a href={GOOGLE_OAUTH2_URL}>
        <FormButton text="Sign in with Google" inverted={false} />
      </a>
      <a href={FACEBOOK_OAUTH2_URL}>
        <FormButton text="Sign in with Facebook" inverted={false} />
      </a>
      <a href={GITHUB_OAUTH2_URL}>
        <FormButton text="Sign in with GitHub" inverted={false} />
      </a>

      <div className={styles.separator}>
        <div className={styles.separatorLine} />
        or
        <div className={styles.separatorLine} />
      </div>
      <Form onSubmit={handleLoginClick} className={styles.loginForm}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          onChange={ev => emailChanged(ev.target.value)}
        />
        <label htmlFor="password">
          Password
          <Link to="/forgot" className={styles.linkTo}>Forgot password</Link>
        </label>
        <PasswordInput
          idName="password"
          value={password}
          onChange={passwordChanged}
        />
        <FormButton text="Sign In" inverted />
      </Form>
    </div>
  );
};

export default LoginForm;
