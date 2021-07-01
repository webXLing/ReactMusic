/*
 * @Author: web_XL
 * @Date: 2021-06-18 16:45:12
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-20 15:03:50
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import ThemeHeaderRcm from '@/components/theme-header-rcm'
import ThemeCover from '@/components/theme-cover'


import {
  HotRecommendWrapper
} from './style'
import { getHotRcmdAction } from './../../store/actionCreators'
import { HOT_RECOMMEND_LIMIT } from '@/common/constants'

export default memo(function XLHotRecommend () {
  // state
  // redux hooks
  const dispatch = useDispatch()
  const { hotRcmList } = useSelector(state => ({
    hotRcmList: state.getIn(["recommend", "hotRcmList"])
  }), shallowEqual)

  // other hooks
  useEffect(() => {
    dispatch(getHotRcmdAction(HOT_RECOMMEND_LIMIT))
  }, [dispatch])

  return (
    <HotRecommendWrapper>
      <ThemeHeaderRcm title="测试" keywords={['华语', '流行', '摇滚', '民谣', '电子']}></ThemeHeaderRcm>
      <div className="recommend-list">
        {hotRcmList && hotRcmList.map((item, index) => {
          return <ThemeCover
            key={item.id} info={item} />
        })}
      </div>
    </HotRecommendWrapper>
  )
})
