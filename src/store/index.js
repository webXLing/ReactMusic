/*
 * @Author: web_XL
 * @Date: 2021-06-11 11:00:54
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-28 14:13:40
 * @Description:
 */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 使控制台redux 可以被监听
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))


export default store