import React from 'react';
import styles from './styles.module.scss';

export interface IFormButtonProps {
  text: string;
  inverted: boolean;
}

const FormButton: React.FC<IFormButtonProps> = ({ text, inverted }) => (
  <button type="button" className={(inverted ? styles.submitButton : styles.oauthButton)}>{text}</button>
);

export default FormButton;
