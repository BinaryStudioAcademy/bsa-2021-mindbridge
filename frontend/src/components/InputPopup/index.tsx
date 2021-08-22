import React from 'react';
import { Form, FormInputProps, Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';

export interface IInputPopupProps extends FormInputProps {
  styleType?: string;
  isValueValid: boolean;
  errorMessage: string;
  id?: string;
}

const InputPopup: React.FC<IInputPopupProps> = (
  {
    styleType,
    isValueValid,
    setValue,
    validateValue,
    errorMessage,
    id,
    label,
    type,
    placeholder,
    ...props
  }
) => {
  const handleSetValue = value => {
    setValue(value);
    validateValue(value);
  };

  return (
    <Popup
      className={styleType === 'passwordPopup' ? styles.passwordPopup : null}
      content={errorMessage}
      position="right center"
      open={!isValueValid}
      trigger={(
        <Form.Input
          id={id}
          type={type}
          label={label}
          placeholder={placeholder}
          required
          onChange={e => handleSetValue(e.target.value)}
          error={!isValueValid}
          {...props}
        />
      )}
    />
  );
};

export default InputPopup;
