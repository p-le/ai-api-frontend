import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { logger } from 'redux-logger';
import DevTools from '../components/DevTools';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(initialState = {}, history) {
  const middlewares = [];
  const saga = createSagaMiddleware();
  const router = routerMiddleware(history);
  
  middlewares.push(saga);
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

  store.runSaga = saga.run;
  store.close = () => store.dispatch(END);
  store.runSaga(rootSaga);
  
  return store;
}