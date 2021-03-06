import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

// 导入 reducers and state type
import { exampleReducer, ExampleState } from './reducers/exampleReducer';
import { loginReducer, LoginState } from './reducers/loginReducer';
import { adminUserReducer, AdminUserState } from './reducers/adminUserReducer';

// 为App创建一个State type
export interface AppState {
  exampleState: ExampleState;
  loginState: LoginState;
  adminUserState: AdminUserState;
}

// 创建 root reducer
const rootReducer = combineReducers<AppState>({
  exampleState: exampleReducer,
  loginState: loginReducer,
  adminUserState: adminUserReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginState'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = composeWithDevTools({
  // 在这里指定名称，actionsBlacklist, actionsCreators和其他选项如果需要
});

// 创建store
export default function configureStore(): Store<AppState> {
  return createStore(
    persistedReducer,
    undefined,
    composeEnhancers(applyMiddleware(thunk, createLogger()))
  );
}
