import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { IBindingCallback1 } from '@models/Callbacks';
import { fetchDataRoutine } from '@screens/EmailSuccessConfirmation/routines';
import { useParams } from 'react-router-dom';
import { extractData } from '@screens/EmailSuccessConfirmation/reducers';
import { history } from '@helpers/history.helper';
import { IStateProfile } from '@screens/PostPage/models/IStateProfile';
import EmailConfirmation from '@screens/EmailConfirmation/containers/EmailConfirmationPage';

export interface IEmailSuccessConfirmationProps extends IState, IActions {

}

interface IState {
  data: IUserProfile;
}

interface IActions {
  fetchData: IBindingCallback1<string>;
}

const EmailSuccessConfirmation: React.FC<IEmailSuccessConfirmationProps> = (
  { fetchData, data }
) => {
  const { code } = useParams();

  useEffect(() => {
    fetchData(code);
  }, [code]);

  return (
    <div>
      {data.emailVerified ? (
        <div className={styles.container}>
          <div className={styles.wrapper_block}>
            <div className={styles.wrapper_title}>
              <div className={styles.success}>Success!</div>
            </div>
            <div className={styles.success_block}>
              <div className={styles.success_block_placeholder}>
                The email has been successfully verified.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmailConfirmation />
      )}
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  data: extractData(state).user
});

const mapDispatchToProps: IActions = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSuccessConfirmation);
