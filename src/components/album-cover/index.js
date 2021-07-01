/*
 * @Author: web_XL
 * @Date: 2021-06-21 09:46:10
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-21 10:06:40
 * @Description:
 */
import React, { memo } from 'react'

import { getSizeImage } from '@/utils/format-utils.js'

import { AlbumCoverWrapper } from './style'

export default memo(function AlbumCover (props) {
  // 传递该组件: width height  做默认值
  // 对图片使用工具函数限制大小
  const { info, size = 130, width = 153, bgp = "-845px" } = props
  return (
    <AlbumCoverWrapper width={width} bgp={bgp} size={size}>
      <div className="album-image">
        <img src={getSizeImage(info.picUrl, size)} alt={info.name} />
        <a href="/discover/recommend" className="no-link image_cover cover">{info.name}</a>
      </div>
      <div className="album-name text-nowrap">{info.name}</div>
      <div className="artist text-nowrap">{info.artist.name}</div>
    </AlbumCoverWrapper>
  )
})
