import axios from 'axios';
import * as Types from './types';
/*eslint-disable */
import Config from 'Config';
/*eslint-enable */

export const openWs = ws => ({
  type: Types.OPEN_WS,
  ws
});

export const checkValidFiles = files => ({
  type: Types.CHECK_VALID_FILES,
  files
});

export const checkInvalidFiles = files => ({
  type: Types.CHECK_INVALID_FILES,
  files
});

export const uploadFiles = (files) => {
  const data = new FormData();
  files.map(file => data.append('file[]', file));
  return (dispatch) => {
    const config = {
      onUploadProgress: e => dispatch(updateProgress(e))
    };
    dispatch(uploading());
    axios.post(`${Config.backend}/api/upload`, data, config).then((res) => {
      const result = res.data;
      dispatch(uploadDone(result));
    })
    .catch(err => dispatch(uploadFailed(err)));
  };
};

const updateProgress = event => ({
    type: Types.UPLOAD_PROGRESS,
    percentage:  Math.round((event.loaded * 100) / event.total)
});

const uploading = () => ({
  type: Types.UPLOADING
});

const uploadFailed = error => ({
  type: Types.UPLOAD_FAILED,
  error
});

const uploadDone = result => ({
  type: Types.UPLOAD_DONE,
  result
});

export const processDone = file => ({
  type: Types.PROCESS_DONE,
  file
});