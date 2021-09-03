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
import {IStateProfile} from "@screens/PostPage/models/IStateProfile";

export interface IEmailSuccessConfirmationProps extends IState, IActions {
  user: IUserProfile;
}

interface IState {
  userInfo: IStateProfile;
}

interface IActions {

}

const EmailSuccessConfirmation: React.FC<IEmailSuccessConfirmationProps> = (
  { userInfo }
) => {

  return (
    <div>
      <p>
        ASdasd
        <p>
          {userInfo.profile.emailVerified}
        </p>
        <p>
          {userInfo.profile.id}
        </p>
        {userInfo.profile.emailVerified}
      </p>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  userInfo: extractData(state)
});

const mapDispatchToProps: IActions = {
  fetchUser: verifiedKeyRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSuccessConfirmation);
