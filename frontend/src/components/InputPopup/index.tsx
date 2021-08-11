import React from 'react';
import { Form, FormInputProps, Popup } from 'semantic-ui-react';

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
