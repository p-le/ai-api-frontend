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
      onUploadProgress: (event) => {
        const percentage = Math.round((event.loaded * 100) / event.total);
        if (percentage === 100) {
          dispatch(uploadDone());
        }
        dispatch(updateProgress(percentage));
      }
    };
    
    dispatch(uploading());
    axios.post(`${Config.backend}/api/upload`, data, config).then((res) => {
      const resData = res.data;
      dispatch(processDone(resData));
    })
    .catch(err => dispatch(uploadFailed(err)));
  };
};

const updateProgress = percentage => ({
    type: Types.UPLOAD_PROGRESS,
    percentage
});

const uploading = () => ({
  type: Types.UPLOADING
});

const uploadFailed = error => ({
  type: Types.UPLOAD_FAILED,
  error
});

const uploadDone = () => ({
  type: Types.UPLOAD_DONE
});

export const processDone = data => ({
  type: Types.PROCESS_DONE,
  origin: data.origin,
  result: data.result
});