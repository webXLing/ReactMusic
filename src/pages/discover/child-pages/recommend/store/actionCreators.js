/*
 * @Author: web_XL
 * @Date: 2021-06-14 15:20:39
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-21 14:15:17
 * @Description:
 */
import { getTopBanners, getHotRecommends, getNewAlbums, getToplistDetail } from '@/service/api/recommend'

import { CHANG_BANNER, CHANG_HOT_RCMD, CHANG_NEW_ALBUM, CHANG_UP, CHANG_NEW, CHANG_ORIGIN } from './constants'

// react-redux dispatch
// 如果是一个函数 它会执行这个函数 并且给这个函数返回的函数传入dispatch

export const changeTopBannersAction = (res) => ({
  type: CHANG_BANNER,
  topBanners: res.banners
})


export const changeHotRcmdAction = (res) => ({
  type: CHANG_HOT_RCMD,
  hotRcmList: res.result || []
})

export const changNewAlbumAction = (res) => ({
  type: CHANG_NEW_ALBUM,
  newAlbums: res.albums || []
})

export const changeUpAction = (res) => ({
  type: CHANG_UP,
  obj: res.playlist || []
})


export const changeNewAction = (res) => ({
  type: CHANG_NEW,
  obj: res.playlist || []
})


export const changeOriginAction = (res) => ({
  type: CHANG_ORIGIN,
  obj: res.playlist || []
})


export const getTopBannersAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeTopBannersAction(res))
    })
  }
}

/**
 * 获取热门推荐
 * 之所以要函数返回一个函数  是为了能够传入额外的参数
 * react-redux dispatch
 * 如果是一个函数 它会执行这个函数 并且给这个函数返回的函数传入dispatch
 */
export const getHotRcmdAction = (limit) => {
  return dispatch => {
    getHotRecommends(limit).then(res => {
      dispatch(changeHotRcmdAction(res))
    })
  }
}

// 新碟上架
export const getNewAlbumsAction = (limit) => {
  return dispatch => {
    getNewAlbums(limit).then(res => {
      dispatch(changNewAlbumAction(res))
    })
  }
}


// 获取新榜
export const getToplistDetailActions = (idx) => {
  return dispatch => {
    getToplistDetail(idx).then(res => {
      switch (idx) {
        case 19723756:
          dispatch(changeUpAction(res))
          break
        case 3779629:
          dispatch(changeNewAction(res))
          break
        case 2884035:
          dispatch(changeOriginAction(res))
          break
        default:
      }
    })
  }
}

