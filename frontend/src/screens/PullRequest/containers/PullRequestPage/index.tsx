import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IBindingCallback1 } from '@root/models/Callbacks';
import { fetchPrRoutine } from '../../routines';

export interface IPullRequestProps extends IState, IActions {
}

interface IState {
  currentUser: ICurrentUser;
}

interface IActions {
  fetchPR: IBindingCallback1<string>
}

const PullRequest: React.FC<IPullRequestProps> = (
  { currentUser, fetchPR }
) => {
  const { id } = useParams();
  
  useEffect(() => {
    console.log(id)
    fetchPR(id);
  }, [id]);

  return (
  <div className={classNames('content_wrapper', styles.container)}>pull request</div>
);
  }

const mapStateToProps: (state) => IState = state => ({
  currentUser: state.auth.auth.user
});

const mapDispatchToProps: IActions = {
  fetchPR: fetchPrRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PullRequest);
