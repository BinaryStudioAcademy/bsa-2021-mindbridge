import React, { FunctionComponent } from 'react';
import style from './styles.module.scss';

interface IFavouriteSvgProps {
  handleFavouriteAction: any;
  color: string;
}

/* eslint-disable max-len */
const FavouriteSvg: FunctionComponent<IFavouriteSvgProps> = ({ handleFavouriteAction, color }) => (
  <svg onClick={handleFavouriteAction} className={style.icon} width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5663 0H1.43384C0.895361 0 0.457275 0.438086 0.457275 0.976523V18.6315C0.457275 19.0939 0.688174 19.5214 1.07497 19.7749C1.46259 20.0289 1.94669 20.0692 2.36985 19.8851L8.9222 17.0345C8.97173 17.0129 9.02849 17.0129 9.07798 17.0345L15.6303 19.8851C16.5333 20.2778 17.5429 19.6154 17.5429 18.6315V0.976523C17.5428 0.438086 17.1047 0 16.5663 0V0ZM16.371 18.6315C16.371 18.7725 16.2271 18.8669 16.0978 18.8105L9.54544 15.96C9.1988 15.8092 8.80126 15.8093 8.45466 15.96L1.90231 18.8105C1.77302 18.8668 1.62911 18.7726 1.62911 18.6315V1.17184H16.3709V18.6315H16.371Z" fill={color} />
  </svg>
);
export default FavouriteSvg;
