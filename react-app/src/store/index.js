import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import shopsReducer from "./shop";
import itemsReducer from "./item";
import cartsReducer from "./cart";
import ordersReducer from "./orders"
import likesReducer from "./likes"

const rootReducer = combineReducers({
  session,
  shops:shopsReducer,
  items:itemsReducer,
  carts:cartsReducer,
  orders:ordersReducer,
  likes:likesReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
