/*
 * @Author: web_XL
 * @Date: 2021-06-23 10:21:45
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-24 15:41:00
 * @Description:
 */
import request from '../request'


// 歌曲详情
export function getSongDetail (ids) {
  return request({
    url: '/song/detail',
    params: {
      ids,
    },
  })
}


// 通过id获取歌词
export function getLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id,
    },
  })
}
