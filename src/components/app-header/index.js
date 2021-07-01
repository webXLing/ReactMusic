/*
 * @Author: web_XL
 * @Date: 2021-06-09 10:21:18
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-09 17:18:54
 * @Description:
 */
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { HeaderWrapper, HeaderRight, HeaderLeft } from './style'
import { headerLinks } from '@/common/local-data'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default memo(function XLAppHeader () {



  // Header-Select-Item 头部tab栏
  const showSelectItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink
          key={item.title}
          to={item.link}
          className="header-item"
          activeClassName="link-active"
        >
          <em>{item.title}</em>
          <i className="icon"></i>
        </NavLink>
      );
    } else {
      return (
        <a href={item.link} key={item.title} className="header-item">
          {item.title}
        </a>
      );
    }
  };

  // 返回的jsx
  return (

    <HeaderWrapper>
      <div className="content w1100">
        <HeaderLeft>
          <h1>
            <a href="#/" className="logo sprite_01">网易云音乐</a>
            {/*  Line 49:13:  Anchors must have content and the content must be accessible by a screen reader  jsx-a11y/anchor-has-content*/}
          </h1>
          <div className="header-group">
            {headerLinks.map((item, index) => {
              return showSelectItem(item, index)
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <div className="search-wrapper">
            <Input placeholder="音乐/歌手" prefix={<SearchOutlined />}></Input>
            <div className="center">创作者中心</div>
            <div className="login">登录</div>
          </div>

        </HeaderRight>
      </div>
      <div className="red-line"></div>

    </HeaderWrapper>
  )
})
