import * as Types from './types';

export const checkValidFiles = files => ({
  type: Types.CHECK_VALID_FILES,
  files
});

export const checkInvalidFiles = files => ({
  type: Types.CHECK_INVALID_FILES,
  files
});