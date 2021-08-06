import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';

declare global {
  interface Window { // eslint-disable-line
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // eslint-disable-next-line no-mixed-operators
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 } as any) || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);
