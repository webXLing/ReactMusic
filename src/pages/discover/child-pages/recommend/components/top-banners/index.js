/*
 * @Author: web_XL
 * @Date: 2021-06-16 16:26:53
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-24 09:14:02
 * @Description:
 */

// 1. 第三方开库
import React, { memo, useEffect, useRef, useCallback, useState } from 'react'

// 2. 功能性东西
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getTopBannersAction } from '../../store/actionCreators'

// 3. 导入的组件
import { Carousel } from 'antd'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'



export default memo(function XLTopBanner () {
  // 组件内部的state
  const [currentIndex, setcurrentIndex] = useState(0)
  // redux Hook 组件和redux关联: 获取数据和进行操作
  const dispatch = useDispatch()
  const { topBanners } = useSelector(state => ({
    // topBanners: state.recommend.topBanners
    // topBanners: state.recommend.get("topBanners")
    // topBanners: state.get("recommend").get("topBanners")
    topBanners: state.getIn(["recommend", "topBanners"])
  }), shallowEqual)

  // 这里需要 [dispatch] 不然会报错
  useEffect(() => {
    dispatch(getTopBannersAction())
  }, [dispatch])


  // 其他的hooks
  const bannerRef = useRef()
  // console.log("render1");
  const bannerChange = useCallback((form, to) => {
    setcurrentIndex(to)
  }, [])

  useEffect(() => {
    // console.log("moundid and update");
  })

  // 其他的逻辑
  const bgImage = topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20")
  // console.log("render2");
  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner w980">
        <BannerLeft>
          <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerChange}>
            {topBanners.map(item => {
              return (
                <div key={item.imageUrl}>
                  <img src={item.imageUrl} alt={item.typeTitle} />
                </div>
              )
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button
            className="btn"
            onClick={e => bannerRef.current.prev()}
          ></button>
          <button
            className="btn"
            onClick={e => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})
