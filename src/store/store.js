import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
// 获取所有的reducer集合
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());

export default store;