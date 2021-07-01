/*
 * @Author: web_XL
 * @Date: 2021-06-14 15:08:04
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-23 10:27:02
 * @Description:
 */

// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../pages/discover/child-pages/recommend/store'
import { reducer as playerReducer } from '../pages/player/store'

// redux-immutable 解决了redux中的state不可变性的问题,因为要保证state不可变性,在每次更新state之前都会将之前state进行一次拷贝,如果数据量大的话会非常小号性能

// 合并拆分的reducer
const reducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer
})

export default reducer