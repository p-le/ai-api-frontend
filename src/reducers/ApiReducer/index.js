import * as Types from '../../actions/Api/types';

const initialState = {
  ws: null,
  validFiles: [],
  invalidFiles: []
};

const ApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_WS:
      return Object.assign({}, state, { ws: action.ws});
    case Types.CHECK_VALID_FILES:
      return Object.assign({}, state, { validFiles: action.files});
    case Types.CHECK_INVALID_FILES:
      return Object.assign({}, state, { invalidFiles: action.files});
    default:
      return state;
  }
};

export default ApiReducer;