import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import app from './app/reducer';
import measures from './measures/reducer';

// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({
  app,
  measures
});

export default createStoreWithMiddleware(reducer);