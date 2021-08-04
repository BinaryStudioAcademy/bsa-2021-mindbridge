import React from 'react';
import styles from './styles.module.scss';
import HideSvg from '@screens/Login/components/svgs/HideSvg';
import UnhideSvg from '@screens/Login/components/svgs/UnhideSvg';
import { IBindingAction } from '@models/Callbacks';

export interface IPasswordInputProps {
  onToggleInput: IBindingAction;
}

const InputButton: React.FC<IPasswordInputProps> = ({ onToggleInput }) => {
  const [isShowed, setIsShowed] = React.useState(false);

  const toggleShowPassword = () => {
    setIsShowed(!isShowed);
    onToggleInput();
  };

  return (
    <button id="viewButton" className={styles.showPasswordToggle} onClick={toggleShowPassword} type="button">
      {isShowed ? <UnhideSvg /> : <HideSvg />}
    </button>
  );
};

export default InputButton;
