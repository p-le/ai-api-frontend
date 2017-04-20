import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import DevTools from '../components/DevTools';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(initialState = {}, history) {
  const saga = createSagaMiddleware();
  const router = routerMiddleware(history);
  
  const enhancers = [
    applyMiddleware(
      createLogger(),
      saga,
      router
    )
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