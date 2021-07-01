/*
 * @Author: web_XL
 * @Date: 2021-06-20 13:54:33
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-20 14:09:06
 * @Description: 
 */
import React, { memo } from 'react'
import propTypes from 'prop-types'
import {
  RcmHeaderWrapper,
  RcmHeaderLeft,
  RcmHeaderRight
} from './style'

const XLThemeHeaderRcm = memo(function (props) {
  const { title, keywords } = props
  return (
    <RcmHeaderWrapper showIcon>
      <RcmHeaderLeft>
        <h2 className="hot-title">
          <a href="/discover/recommend" className="no-link hot-text">
            {title}
          </a>
        </h2>
        <ul className="keywords">
          {keywords.map(item => {
            return (
              <li className="item" key={item}>
                <a href="/">{item}</a>
                <span className="line">|</span>
              </li>
            )
          })}
        </ul>
      </RcmHeaderLeft>
      <RcmHeaderRight>
        <span>更多</span>
        <i className="icon"></i>
      </RcmHeaderRight>

    </RcmHeaderWrapper>
  )
})

XLThemeHeaderRcm.propTypes = {
  title: propTypes.string.isRequired,
  keywords: propTypes.array
}
XLThemeHeaderRcm.defaultProps = {
  title: "标题",
  keywords: []
}
export default XLThemeHeaderRcm