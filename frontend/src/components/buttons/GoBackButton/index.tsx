import React from 'react';
import DarcBorderButton from '../DarcBorderButton';
import { useHistory } from 'react-router-dom';

interface IGoBackButtonProps {
  className?: string;
}

const GoBackButton = ({ className }: IGoBackButtonProps) => {
  const history = useHistory();
  return (
    <DarcBorderButton
      className={className}
      content="Go back"
      onClick={() => {
        history.goBack();
      }}
    />
  );
};

export default GoBackButton;
