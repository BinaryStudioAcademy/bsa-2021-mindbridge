import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IUserProfile } from '@screens/PostPage/models/IUserProfile';
import { IBindingCallback1 } from '@models/Callbacks';
import { verifiedKeyRoutine } from '@screens/EmailSuccessConfirmation/routines';
import { useParams } from 'react-router-dom';
import { extractData } from '@screens/EmailSuccessConfirmation/reducers';
import { emailSuccessConfirmationReducer } from '@screens/EmailSuccessConfirmation/containers/EmailSuccessConfirmationPage/reducer';

export interface IEmailSuccessConfirmationProps extends IState, IActions {
  user: IUserProfile;
}

interface IState {
  userInfo: IUserProfile;
}

interface IActions {
  fetchUser: IBindingCallback1<string>;
}

const EmailSuccessConfirmation: React.FC<IEmailSuccessConfirmationProps> = (
  { userInfo, fetchUser }
) => {
  const { code } = useParams();

  useEffect(() => {
    fetchUser(code);
  }, [code]);
  return (
    <div>
      <p>
        ASdasd
        <p>
          {userInfo.emailVerified}
        </p>
        <p>
          {userInfo.id}
        </p>
        {userInfo.emailVerified}
      </p>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  userInfo: extractData(state).profile
});

const mapDispatchToProps: IActions = {
  fetchUser: verifiedKeyRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSuccessConfirmation);
