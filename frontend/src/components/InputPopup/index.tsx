import React from 'react';
import { Form, FormInputProps, Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PasswordInput from '@screens/Login/components/PasswordInput';

export interface IInputPopupProps extends FormInputProps {
  isValueValid: boolean;
  errorMessage: string;
  id?: string;
}

const InputPopup: React.FC<IInputPopupProps> = (
  {
    isValueValid,
    setValue,
    validateValue,
    errorMessage,
    id,
    ...props
  }
) => {
  const handleSetValue = value => {
    setValue(value);
    validateValue(value);
  };

  return (
    <Popup
      content={errorMessage}
      position="right center"
      open={!isValueValid}
      trigger={(
        <Form.Input
          id={id}
          // type={props.type}
          // label={props.label}
          // placeholder={props.placeholder}
          required
          onChange={e => handleSetValue(e.target.value)}
          error={!isValueValid}
        />
      )}
    />
  );
};

export default InputPopup;
