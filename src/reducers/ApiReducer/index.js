import * as Types from '../../actions/Api/types';

const initialState = {
  allowedTypes: [
      // 'application/vnd.ms-excel',
      // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  isUploading: false,
  isUploaded: false,
  isProcessing: false,
  isProcessed: false,
  percentCompleted: 0,
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
        origin: '',
        result: ''
      });
    case Types.UPLOAD_DONE:
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: true,
        isProcessing: true
      });
    case Types.UPLOAD_PROGRESS:
      return Object.assign({}, state, {
        percentCompleted: action.percentage
      });
    case Types.PROCESSING:
      return Object.assign({}, state, {
        isProcessing: true
      });
    case Types.PROCESS_DONE:
      return Object.assign({}, state, {
        isProcessing: false,
        isProcessed: true,
        origin: action.origin,
        result: action.result
      });
    default:
      return state;
  }
};

export default ApiReducer;