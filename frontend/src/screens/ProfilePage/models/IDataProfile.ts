export interface IDataProfile {
  isNicknameEngaged: boolean;
  isPasswordRight: boolean;
  isFormLoaded: boolean;
  isChangePasswordFormLoaded: boolean;
  isNicknameLoaded: boolean;
  isPasswordChangeModalOpen: boolean;
  savingAvatar: {
    url: string;
    isLoaded: boolean;
  };
}
