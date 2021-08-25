import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface IHighlightComponentProps {
  top: number;
  left: number;
}

const HighlightComponent: FunctionComponent<IHighlightComponentProps> = ({ top, left }) => {
  const divStyle = {
    margin: `${top}px 0 0 ${left}px`
  };
  return (
    <div className={styles.highlightComponent} style={divStyle}>
      Test
    </div>
  );
};

export default HighlightComponent;
