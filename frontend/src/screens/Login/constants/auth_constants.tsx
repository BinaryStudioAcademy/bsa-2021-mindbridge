/* eslint-disable max-len */
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

const OAUTH2_REDIRECT_URI = 'oauth2/resolve';

export const GOOGLE_OAUTH2_URL = `/api/auth/oauth2/authorize/google?redirect_uri=${window.origin}/${OAUTH2_REDIRECT_URI}`;

export const FACEBOOK_OAUTH2_URL = `/api/auth/oauth2/authorize/facebook?redirect_uri=${window.origin}/${OAUTH2_REDIRECT_URI}`;

export const GITHUB_OAUTH2_URL = `/api/auth/oauth2/authorize/github?redirect_uri=${window.origin}/${OAUTH2_REDIRECT_URI}`;
