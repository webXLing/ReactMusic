/*
 * @Author: web_XL
 * @Date: 2021-06-09 10:21:18
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-14 15:53:10
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import { HeaderCategory } from './style'
import AppNavBar from '@/components/nav-bar'
import { renderRoutes } from 'react-router-config'
import request from '../../service/request'


export default memo(function XLDiscover (props) {
  // 通过renderRoutes 渲染出来的的才有route
  // useEffect(() => {
  //   request({
  //     url: "/banner"
  //   })
  //     .then(res => {
  //       console.log("post---", res);
  //     })
  // }, [])
  const { route } = props
  return (
    <HeaderCategory>
      <AppNavBar></AppNavBar>
      {renderRoutes(route.routes)}
    </HeaderCategory>
  )
})
