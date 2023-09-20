import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import campsitesReducer from './campsite';
import reviewsReducer from './review';
import likesReducer from './like';
import campsiteLikesReducer from './campsitelike';
const rootReducer = combineReducers({
  session,
  campsites:campsitesReducer,
  review:reviewsReducer,
  likes:likesReducer,
  campsitelikes:campsiteLikesReducer
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
