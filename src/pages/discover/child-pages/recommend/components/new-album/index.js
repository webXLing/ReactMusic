/*
 * @Author: web_XL
 * @Date: 2021-06-20 14:12:51
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-21 09:50:45
 * @Description:
 */
import React, { memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { Carousel } from 'antd'
import ThemeHeaderRcm from '@/components/theme-header-rcm'
import AlbumCover from 'components/album-cover'


import { getNewAlbumsAction } from './../../store/actionCreators'
import { NewAlbumWrapper } from './style'

export default memo(function XLNewAlbum () {
  // state

  const { newAlbums } = useSelector(state => ({
    newAlbums: state.getIn(["recommend", "newAlbums"])
  }), shallowEqual)
  // redux hooks
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNewAlbumsAction(10))
  }, [dispatch])

  // other hooks
  const albumRef = useRef()

  return (
    <NewAlbumWrapper>
      <ThemeHeaderRcm title="新碟上架" ></ThemeHeaderRcm>
      <div className="content">
        <div className="inner">
          <Carousel dots={false} ref={albumRef}>
            {[0, 1].map(item => {
              return (
                <div key={item} className="page">
                  {/* item * 5, (item+1) * 5   第一次遍历0  5  第二次遍历 5  10  */}
                  {newAlbums && newAlbums.slice(item * 5, (item + 1) * 5).map(cItem => {
                    return (
                      <AlbumCover
                        key={cItem.id}
                        info={cItem}
                        size={100}
                        width={118}
                        bgp="-570px"
                      >
                        {cItem.name}
                      </AlbumCover>
                    )
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <div
          className="sprite_02 arrow arrow-left"
          onClick={e => albumRef.current.prev()}
        ></div>
        <div
          className="sprite_02 arrow arrow-right"
          onClick={e => albumRef.current.next()}
        ></div>
      </div>
    </NewAlbumWrapper>
  )
})
