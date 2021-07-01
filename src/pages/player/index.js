/*
 * @Author: web_XL
 * @Date: 2021-06-24 09:27:08
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-24 09:32:07
 * @Description:
 */
import React, { memo } from 'react'
import {
  SongDetailWrapper,
  SongLeft,
  SongRight
} from './style'

export default memo(function XLPlayerInfo () {
  return (
    <SongDetailWrapper>
      <div className="content w980">
        <SongLeft></SongLeft>
        <SongRight></SongRight>
      </div>
    </SongDetailWrapper>
  )
})
