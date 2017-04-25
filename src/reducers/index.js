import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ApiReducer from './ApiReducer';

export default combineReducers({
  api: ApiReducer,
  routing: routerReducer
});