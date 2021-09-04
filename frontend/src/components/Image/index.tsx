import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

export interface IImageProps {
  src: string;
  alt?: string;
  style?: any;
  className?: string;
}

const Image: React.FC<IImageProps> = (
  {
    src,
    alt,
    style,
    className
  }
) => (
  <img style={style} className={classNames(className, styles.image)} src={src} alt={alt} />
);

export default Image;
