import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './auth/login/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export type RootStateType = ReturnType<typeof rootReducer>;
export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
