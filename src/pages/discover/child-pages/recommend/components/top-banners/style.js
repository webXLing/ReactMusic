/*
 * @Author: web_XL
 * @Date: 2021-06-16 16:27:15
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-16 17:11:05
 * @Description: 
 */
// const { default: styled } = require('styled-components')
import styled from 'styled-components'
{/* <BannerWrapper bgImage={bgImage}> 上的属性可以作为参数传递过来 */ }
export const BannerWrapper = styled.div`
  background: url('${props => props.bgImage}') center center/6000px;
  width: 100%;
  height: 270px;

  .banner {
    position: relative;
    display: flex;
    height: 100%;
    justify-content: space-between;
  }
`

export const BannerLeft = styled.div`
  width: 730px;

  img {
    width: 100%;
  }
`

export const BannerRight = styled.a.attrs({
  // href: 'https://music.163.com/#/download',
  href: 'https://d1.music.126.net/dmusic/cloudmusicsetup2.8.0.198822.exe',
  target: '_blank',
})`
  width: 250px;
  background: url(${require('@/assets/img/download.png').default});
`

export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-image: url(${require("@/assets/img/banner_sprite.png").default});
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:nth-child(1) {
      left: -68px;
      background-position: 0 -360px;
    }
    &:nth-child(2) {
      right: -68px;
      background-position: 0 -508px;
    }
  }
`
