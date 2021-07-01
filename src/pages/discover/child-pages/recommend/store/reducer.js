/*
 * @Author: web_XL
 * @Date: 2021-06-14 15:20:46
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-21 10:40:33
 * @Description:
 */
import { Map } from 'immutable'
import * as actionTypes from './constants'



// yarn add immutable
/**
 * yarn add immutable
 * 使用immutable的原因 redux-immutable 解决了redux中的state不可变性的问题,因为要保证state不可变性,在每次更新state之前都会将之前state进行一次拷贝,如果数据量大的话会非常小号性能
 * 使用Immutable管理redux中的state (修改的`state`不会修改原有数据结构, 而是返回修改后新的数据结构)
 * Map 只会将第一层处理为im对象
 */


const initalState = Map({
  topBanners: [],
  hotRcmList: [],// 热门推荐
  newAlbums: [],//新碟上架

  upRanking: {}, // 飙升
  newRanking: {},// 新歌
  originRanking: {}, // 原创
})

function reducer (preState = initalState, action) {
  switch (action.type) {
    case actionTypes.CHANG_BANNER:
      // return { ...preState, topBanners: action.topBanners }
      return preState.set("topBanners", action.topBanners)

    case actionTypes.CHANG_HOT_RCMD:
      return preState.set("hotRcmList", action.hotRcmList)

    case actionTypes.CHANG_NEW_ALBUM:
      return preState.set("newAlbums", action.newAlbums)

    case actionTypes.CHANG_NEW:
      return preState.set("newRanking", action.obj)

    case actionTypes.CHANG_UP:
      return preState.set("upRanking", action.obj)

    case actionTypes.CHANG_ORIGIN:
      return preState.set("originRanking", action.obj)

    default:
      return preState
      break;
  }

}
export default reducer