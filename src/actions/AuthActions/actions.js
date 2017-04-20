import * as Types from './types';

export const authenticate = () => ({
  type: Types.AUTHENTICATE
});

export const signout = () => ({
  type: Types.SIGNOUT
});

export const getCode = code => ({
  type: Types.GET_CODE,
  code
});

export const refreshToken = () => ({
  type: Types.REFRESH_TOKEN
});

export const updateEndpoint = endpoint => ({
  type: Types.UPDATE_ENDPOINT,
  endpoint
});

export const updateAccessToken = token => ({
  type: Types.UPDATE_ACCESS_TOKEN,
  token
});