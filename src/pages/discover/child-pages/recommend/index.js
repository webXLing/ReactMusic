/*
 * @Author: web_XL
 * @Date: 2021-06-10 21:05:01
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-20 14:16:07
 * @Description: 
 */

//#region 不再使用connect函数
// redux-immutable 解决了redux中的state不可变性的问题,因为要保证state不可变性,在每次更新state之前都会将之前state进行一次拷贝,如果数据量大的话会非常小号性能
// 使用useSelector的缺点: 因为在useSelector的缺点在组件决定当前是否渲染之前会进行一次引用对比,每次函数调用之后都会进行一次重新渲染 及时并没有映射变量 当时redux 真个state任意发生变化 都会导致组件重新渲染
// 解决useSelector的缺点: 使用shallowEqual进行优化,在组件决定是否被渲染之前,会进行一次浅层对比如果该组件依赖的state并没有被更改,就不会进行渲染
//  使用react-redux的connect函数,将依赖的state和dispatch传递给connect
//#endregion
import React, { memo, useEffect } from 'react'
// import { connect, useDispatch, useSelector, shallowEqual } from 'react-redux'

// import { getTopBannersAction } from './store/actionCreators'

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from './style'
import TopBanners from './components/top-banners'
import HotRecommend from './components/hot-recommend'
import NewAlbum from './components/new-album'
import Ranking from './components/ranking'


/**
 * 不使用 redux hooks 
 */

function XLRecommend (props) {
  console.log("XLRecommend", props);
  // 组件和redux进行关联 主要两个目的 一个是获取state 一个是红区dispatch 操作数据

  // const dispatch = useDispatch()
  // const { topBanners } = useSelector(state => ({
  //   // topBanners: state.recommend.topBanners
  //   // topBanners: state.recommend.get("topBanners")
  //   // topBanners: state.get("recommend").get("topBanners")
  //   topBanners: state.getIn(["recommend", "topBanners"])
  // }), shallowEqual)

  // // 这里需要 [dispatch] 不然会报错
  // useEffect(() => {
  //   // dispatch(getTopBannersAction())
  // }, [dispatch])


  return (
    <RecommendWrapper>
      {/* 轮播图 */}
      <TopBanners />
      <Content className="w980">
        <RecommendLeft>
          {/* 热门推荐 */}
          <HotRecommend></HotRecommend>
          {/* 新碟上架 */}
          <NewAlbum />
          {/* 榜单 */}
          <Ranking />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}


export default memo(XLRecommend)




// import React, { memo, useEffect } from 'react'
// import { connect } from 'react-redux'

// import { getTopBannersAction } from './store/actionCreators'


// function XLRecommend (props) {
//   console.log("XLRecommend", props);
//   const { topBanners, getBanners } = props
//   useEffect(() => {
//     getBanners()
//   }, [getBanners])
//   return (
//     <div>
//       XLRecommend:{topBanners.length}
//     </div>
//   )
// }


// // // 定义依赖的state
// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners,
// })

// // // 定义依赖的dispatch
// const mapDispatchToProps = dispatch => ({
//   getBanners () {
//     dispatch(getTopBannersAction())
//   },
// })

// export default connect(mapStateToProps, mapDispatchToProps)(memo(XLRecommend))