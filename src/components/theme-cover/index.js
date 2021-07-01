/*
 * @Author: web_XL
 * @Date: 2021-06-20 14:59:51
 * @LastEditors: web_XL
 * @LastEditTime: 2021-07-01 10:42:25
 * @Description: 
 */
import React, { memo } from 'react';

import {
  getSizeImage,
  getCount
} from "@/utils/format-utils";

import {
  ThemeCoverWrapper
} from "./style";

export default memo(function HYThemeCover (props) {
  const { info, right } = props;

  return (
    <ThemeCoverWrapper right={right}>
      <div className="cover-top">
        <img src={getSizeImage(info.picUrl || info.coverImgUrl, 140)} alt="" />
        <div className="cover sprite_covor">
          <div className="info sprite_covor">
            <span>
              <i className="sprite_icon erji"></i>
              {getCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">
        {info.name}
      </div>
      <div className="cover-source">
        by {info.copywriter || (info.creator && info.creator.nickname)}
      </div>
    </ThemeCoverWrapper>
  )
})
