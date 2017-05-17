import * as Types from '../../actions/Api/types';
import File from '../../utils/file';

const initialState = {
  allowedTypes: [
      // 'application/vnd.ms-excel',
      // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  isUploading: false,
  isUploaded: false,
  percentCompleted: 0,
  validFiles: [],
  invalidFiles: [],
  origin: '',
  result: ''
};

const ApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPLOADING:
      return Object.assign({}, state, {
        isUploading: true,
        isUploaded: false,
        percentCompleted: 0,
        validFiles: [],
        invalidFiles: [],
        origin: '',
        result: ''
      });
    case Types.UPLOAD_DONE:
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: true
      });
    case Types.UPLOAD_PROGRESS:
      return Object.assign({}, state, {
        percentCompleted: action.percentage
      });
    case Types.PROCESSING:
      return state;
    case Types.PROCESS_DONE:
      return Object.assign({}, state, {
        origin: action.origin,
        result: action.result
      });
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