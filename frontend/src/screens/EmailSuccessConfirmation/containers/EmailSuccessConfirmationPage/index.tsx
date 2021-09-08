import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';
import { fetchUserRoutine } from '@screens/EmailSuccessConfirmation/routines';
import { useParams } from 'react-router-dom';
import { extractData } from '@screens/EmailSuccessConfirmation/reducers';
import { IUserConfirmationEmail } from '@screens/EmailSuccessConfirmation/models/IUserConfirmationEmail';
import NotFoundPage from '@screens/NotFound/containers/NotFoundPage';
import LoaderWrapper from '@components/LoaderWrapper';
import InvalidActivationCode from '@screens/EmailSuccessConfirmation/containers/InvalidActivationCode';

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
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    fetchUser(code);
  }, [code]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoaderWrapper loading={isLoad}>
      <div>
        {user.emailVerified ? (
          <div>
            {!user.viewed ? (
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
          <InvalidActivationCode />
        )}
      </div>
    </LoaderWrapper>
  );
};

const mapStateToProps: (state) => IState = state => ({
  user: extractData(state).user
});

const mapDispatchToProps: IActions = {
  fetchUser: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSuccessConfirmation);
