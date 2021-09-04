import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';
import { fetchUserRoutine } from '@screens/EmailSuccessConfirmation/routines';
import { useParams } from 'react-router-dom';
import { extractData } from '@screens/EmailSuccessConfirmation/reducers';
import { IUserConfirmationEmail } from '@screens/EmailSuccessConfirmation/models/IUserConfirmationEmail';
import {history} from "@helpers/history.helper";
import NotFoundPage from "@screens/NotFound/containers/NotFoundPage";

export interface IEmailSuccessConfirmationProps extends IState, IActions {
}

interface IState {
  user: IUserConfirmationEmail;
}

interface IActions {
  fetchUser: IBindingCallback1<string>;
}

const EmailSuccessConfirmation: React.FC<IEmailSuccessConfirmationProps> = (
  { fetchUser, user }
) => {
  const { code } = useParams();

  useEffect(() => {
    fetchUser(code);
  }, [code]);

  return (
    <div>
      {!user.emailVerified ? (
        <div>
          {user.isViewed ? (
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
            <NotFoundPage />
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper_block}>
            <div className={styles.wrapper_title}>
              <div className={styles.success}>Failed!</div>
            </div>
            <div className={styles.success_block}>
              <div className={styles.error_block_placeholder}>
                Invalid activation code. Please check your inbox or spam.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

const mapStateToProps: (state) => IState = state => ({
  user: extractData(state).user
});

const mapDispatchToProps: IActions = {
  fetchUser: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSuccessConfirmation);
