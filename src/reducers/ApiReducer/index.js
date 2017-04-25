import { CHECK_VALID_FILES, CHECK_INVALID_FILES } from '../../actions/ApiActions';

const initialState = {
  validFiles: [],
  invalidFiles: []
};

const ApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_VALID_FILES:
      return Object.assign({}, state, { validFiles: [...action.files]});
    case CHECK_INVALID_FILES:
      return Object.assign({}, state, { invalidFiles: [...action.files]});
    default:
      return state;
  }
};

export default ApiReducer;