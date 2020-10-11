import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import { authReducer } from './auth/reducer';
import { postsReducer } from './posts/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();
const store: any = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: true, serializableCheck: false }), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
