import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';

export interface ICreatePostProps extends IState, IActions {
}

interface IState {
}

interface IActions {
}

const CreatePost: React.FC<ICreatePostProps> = (
  { children }
) => (
  <div className={classNames('content_wrapper', styles.container)}>create post</div>
);

const mapStateToProps: (state) => IState = state => ({
});

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
