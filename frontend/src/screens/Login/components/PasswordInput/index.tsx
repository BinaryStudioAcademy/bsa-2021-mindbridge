import React from 'react';
import styles from './styles.module.scss';
import InputButton from '@screens/Login/components/InputButton';

export interface IPasswordInputProps {
  idName: string;
  value: string;
  onChange: (newValue: string) => void;
}

const PasswordInput: React.FC<IPasswordInputProps> = (
  { idName,
    value,
    onChange
  }
) => {
  const [inputType, setInputType] = React.useState('password');

  const handleToggleInput = () => {
    setInputType(inputType === 'text' ? 'password' : 'text');
  };

  return (
    <div className={styles.passwordWrapper}>
      <input
        id={idName}
        type={inputType}
        value={value}
        onChange={ev => onChange(ev.target.value)}
        required
        className={styles.passwordInput}
        placeholder="Enter your password"
      />
      <InputButton onToggleInput={handleToggleInput} />
    </div>
  );
};

export default PasswordInput;
