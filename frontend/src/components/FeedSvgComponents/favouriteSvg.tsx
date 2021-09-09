import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

interface IFavouriteSvgProps {
  handleFavouriteAction: any;
  isFavourite: boolean;
  color: string;
}

const FavouriteSvg: FunctionComponent<IFavouriteSvgProps> = (
  {
    handleFavouriteAction,
    isFavourite,
    color
  }
) => (
  <svg
    onClick={handleFavouriteAction}
    className={styles.favouriteSvg}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="20px"
    y="0px"
    width="23"
    height="25"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    fill={color}
  >
    {!isFavourite
      ? (
    // eslint-disable-next-line max-len
        <path d="M416.667,0H95.333c-8.284,0-15,6.716-15,15v482c0,6.067,3.655,11.536,9.26,13.858c1.856,0.769,3.805,1.142,5.737,1.142c3.904,0,7.74-1.523,10.61-4.394l150.063-150.061L406.06,507.606c4.29,4.29,10.742,5.573,16.347,3.252c5.605-2.322,9.26-7.791,9.26-13.858V15C431.667,6.716,424.951,0,416.667,0z M256.002,321.332c-3.978,0-7.793,1.58-10.606,4.394L110.333,460.787V30h291.333v430.785L266.609,325.726C263.796,322.912,259.981,321.332,256.002,321.332z" />
      ) : (
    // eslint-disable-next-line max-len
        <path d="M416.667,0H95.334c-8.284,0-15,6.716-15,15v482c0,6.067,3.655,11.536,9.26,13.858c1.856,0.769,3.805,1.142,5.737,1.142c3.903,0,7.74-1.523,10.609-4.394l150.063-150.062L406.06,507.606c4.29,4.291,10.741,5.573,16.347,3.252c5.605-2.322,9.26-7.791,9.26-13.858V15C431.667,6.716,424.952,0,416.667,0z" />
      )}
  </svg>
);
export default FavouriteSvg;
