import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { logger } from 'redux-logger';
import DevTools from '../components/DevTools';
import rootReducer from '../reducers';

export default function configureStore(initialState = {}, history) {
  const middlewares = [];
  const router = routerMiddleware(history);
  
  middlewares.push(thunk);
  middlewares.push(router);
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  if (process.env.NODE_ENV !== 'production') {
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  );
  
  return store;
}