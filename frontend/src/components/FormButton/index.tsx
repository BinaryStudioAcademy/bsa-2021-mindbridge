import React from 'react';
import styles from './styles.module.scss';

// eslint-disable-next-line max-len
export interface IFormButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  text: any;
  inverted: boolean;
}

const FormButton: React.FC<IFormButtonProps> = ({ text, inverted, ...props }) => (
  <button type="submit" className={(inverted ? styles.submitButton : styles.oauthButton)} {...props}>{text}</button>
);

export default FormButton;
