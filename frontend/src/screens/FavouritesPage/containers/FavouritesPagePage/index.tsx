import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';

export interface IFavouritesPageProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}

const FavouritesPage: React.FC<IFavouritesPageProps> = (
  { children }
) => (
  <div className={classNames('content_wrapper', styles.container)}>FavouritesPage</div>
);

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);
