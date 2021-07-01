/*
 * @Author: web_XL
 * @Date: 2021-06-20 14:12:51
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-21 13:29:03
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import ThemeHeaderRcm from '@/components/theme-header-rcm'
import TopRanking from 'components/top-ranking'

import { useDispatch, useSelector } from 'react-redux'
import { getToplistDetailActions } from './../../store/actionCreators'
import { RankingWrapper } from './style'

export default memo(function XLRanking () {
  const {
    upRanking,
    newRanking,
    originRanking
  } = useSelector(state => ({
    upRanking: state.getIn(["recommend", "upRanking"]),
    newRanking: state.getIn(["recommend", "newRanking"]),
    originRanking: state.getIn(["recommend", "originRanking"]),
  }))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getToplistDetailActions(19723756))
    dispatch(getToplistDetailActions(3779629))
    dispatch(getToplistDetailActions(2884035))
  }, [dispatch])
  return (
    <RankingWrapper>
      <ThemeHeaderRcm title="榜单" ></ThemeHeaderRcm>
      <div className="ranking-info ">
        <TopRanking info={upRanking}></TopRanking>
        <TopRanking info={newRanking}></TopRanking>
        <TopRanking info={originRanking}></TopRanking>
      </div>

    </RankingWrapper>
  )
})
