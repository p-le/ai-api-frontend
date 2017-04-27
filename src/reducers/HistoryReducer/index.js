import * as Types from '../../actions/History/types';

const initialState = {
  files: []
};

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_DONE:
      return Object.assign({}, state, {
        files: action.files
      });
    default:
      return state;
  }
};

export default HistoryReducer;