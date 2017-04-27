import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ApiReducer from './ApiReducer';
import HistoryReducer from './HistoryReducer';

export default combineReducers({
  api: ApiReducer,
  history: HistoryReducer,
  routing: routerReducer
});