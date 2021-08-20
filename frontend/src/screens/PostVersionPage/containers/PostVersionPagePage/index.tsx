import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';

export interface IPostVersionPageProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}

const PostVersionPage: React.FC<IPostVersionPageProps> = (
  { children }
) => (
  <div className={classNames('content_wrapper', styles.container)}>PostVersionPage</div>
);

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PostVersionPage);
