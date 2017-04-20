import * as AuthTypes from '../../actions/AuthActions/types';

const initialState = {
  isAuthenticated: false,
  currentEndpoint: '',
  code: '',
  accessToken: ''
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.AUTHENTICATE:
      return Object.assign({}, state, {
        isAuthenticated: true
      });
    case AuthTypes.UPDATE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.token
      });
    case AuthTypes.GET_CODE:
      return Object.assign({}, state, {
        code: action.code
      });
    case AuthTypes.UPDATE_ENDPOINT:
      return Object.assign({}, state, {
        currentEndpoint: action.endpoint
      });
    default:
      return state;
  }
};

export default AuthReducer;