import React from 'react';
import styles from './styles.module.scss';

export interface IFormButtonProps {
  text: any;
  inverted: boolean;
}

const FormButton: React.FC<IFormButtonProps> = ({ text, inverted }) => (
  <button type="submit" className={(inverted ? styles.submitButton : styles.oauthButton)}>{text}</button>
);

export default FormButton;
