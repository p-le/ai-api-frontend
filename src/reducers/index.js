import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import AuthReducer from './AuthReducer';

export default combineReducers({
  auth: AuthReducer,
  routing: routerReducer
});