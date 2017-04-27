import * as Types from '../../actions/Api/types';
import File from '../../utils/file';

const initialState = {
  ws: null,
  allowedTypes: [
      // 'application/vnd.ms-excel',
      // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  isUploading: false,
  isUploaded: false,
  percentCompleted: 0,
  validFiles: [],
  invalidFiles: []
};

const ApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPLOADING:
      return Object.assign({}, state, {
        isUploading: true,
        isUploaded: false,
        percentCompleted: 0,
        validFiles: [],
        invalidFiles: []
      });
    case Types.UPLOAD_DONE:
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: true,
        validFiles: action.files
      });
    case Types.PROCESS_DONE:
      return Object.assign({}, state, {
        validFiles: state.validFiles.map((file) => {
          if (file._id === action.file._id) {
            return action.file;
          }
          return file;
        })
      });
    case Types.UPLOAD_PROGRESS:
      return Object.assign({}, state, {
        percentCompleted: action.percentage
      });
    case Types.OPEN_WS:
      return Object.assign({}, state, { ws: action.ws});
    case Types.CHECK_VALID_FILES:
      return Object.assign({}, state, { 
        validFiles: action.files.map(file => new File(file.name, file.size))
      });
    case Types.CHECK_INVALID_FILES:
      return Object.assign({}, state, { 
        invalidFiles: action.files.map(file => new File(file.name, file.size))
      });
    default:
      return state;
  }
};

export default ApiReducer;