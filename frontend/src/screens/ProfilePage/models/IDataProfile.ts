import { IUser } from '@screens/ProfilePage/models/IUser';

export interface IDataProfile {
  isNicknameEngaged: boolean;
  isPasswordRight: boolean;
  isFormLoaded: boolean;
  isChangePasswordFormLoaded: boolean;
  isNicknameLoaded: boolean;
  isPasswordChangeModalOpen: boolean;
  isUserLoaded: boolean;
  isUserIdValid: boolean;
  user: IUser;
  savingAvatar: {
    url: string;
    isLoaded: boolean;
  };
}
