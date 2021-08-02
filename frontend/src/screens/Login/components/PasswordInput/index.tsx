import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import HideSvg from "@screens/Login/components/HideSvg";
import UnhideSvg from "@screens/Login/components/UnhideSvg";

export interface IPasswordInputProps extends IState, IActions {
  idName: string
}

interface IState {
}

interface IActions {
}

const PasswordInput: React.FC<IPasswordInputProps> = (
  { idName }
) => {

  const [isShowed, setIsShowed] = React.useState(false);
  const [inputType, setInputType] = React.useState('password');

  const toggleShowPassword = () => {
    setIsShowed(!isShowed);
    setInputType(inputType === 'text' ? 'password' : 'text');
  }

  return (
    <div className={styles.passwordWrapper}>
      <input id={idName} type={inputType} required className={styles.passwordInput} placeholder={"Enter your password"}/>
      <button id={"viewButton"} className={styles.showPasswordToggle} onClick={toggleShowPassword} type={"button"}>
        {isShowed ? <UnhideSvg/> : <HideSvg/>}
      </button>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordInput);
