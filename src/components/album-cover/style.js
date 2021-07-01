/*
 * @Author: web_XL
 * @Date: 2021-06-21 09:46:15
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-21 10:05:25
 * @Description: 
 */
import styled from 'styled-components'

export const AlbumCoverWrapper = styled.div`
  width: ${props => props.width + 'px'};
  font-size: 12px;

  .album-image {
    position: relative;
    height: ${props => props.size + 'px'};
    margin-top: 15px;
    
    .cover {
      text-indent: -9999px;
      background-position: 0 ${props => props.bgp};
    }
  }

  .album-name {
    width: ${props => props.size + 'px'};
    color: #000;
  }

  .artist {
    color: #666;
  }
`
