import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';

export interface IEmailConfirmationProps extends IState, IActions {
  currentUserEmailVerified: boolean;
}

interface IState {
}

interface IActions {
}

const EmailConfirmation: React.FC<IEmailConfirmationProps> = (
  { currentUserEmailVerified }
) => (
  <div className={classNames('content_wrapper', styles.container)}>
    { currentUserEmailVerified ? (
      <div className={styles.text}>
        Your email confirmation
      </div>
    ) : (
      <div className={styles.text}>
        Oops... Your email not confirmed
        <p>Please confirm you`&apos;`re email</p>
      </div>
    )}
  </div>
);

const mapStateToProps: (state) => IState = state => ({
  currentUserEmailVerified: state.postPageReducer.data.profile.emailVerified
});

const mapDispatchToProps: IActions = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);
