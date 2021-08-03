import React from 'react';
import styles from './styles.module.scss';
import InputButton from '@screens/Login/components/InputButton';

export interface IPasswordInputProps {
  idName: string;
}

const PasswordInput: React.FC<IPasswordInputProps> = (
  { idName }
) => {
  const [inputType, setInputType] = React.useState('password');

  const handleToggleInput = () => {
    setInputType(inputType === 'text' ? 'password' : 'text');
  };

  return (
    <div className={styles.passwordWrapper}>
      <input id={idName} type={inputType} required className={styles.passwordInput} placeholder="Enter your password" />
      <InputButton onToggleInput={handleToggleInput} />
    </div>
  );
};

export default PasswordInput;
