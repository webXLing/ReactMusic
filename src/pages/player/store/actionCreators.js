/*
 * @Author: web_XL
 * @Date: 2021-06-23 10:17:34
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-25 10:18:22
 * @Description:
 */
import {
  SONG_DETAIL,
  CHANGE_CURRENT_SONG_INDEX,
  CHANGE_PLAY_LIST,
  CHANGE_PLAY_SEQUENCE,
  LYRICLIST,
  CURRENTLYRICINDEX
} from './constants'
import { getSongDetail, getLyric } from '@/service/api/songs'
import { getRandomNumber } from '@/utils/math-utils'
import { parseLyric } from '@/utils/parse-lyric'



const changeSongsDetailAction = (song = {}) => ({
  type: SONG_DETAIL,
  song
})

const changeCurrentSongIndexAction = index => ({
  type: CHANGE_CURRENT_SONG_INDEX,
  index
})

const changePlayListAction = playList => ({
  type: CHANGE_PLAY_LIST,
  playList
})

// 更改播放顺序Action
export const changePlaySequenceAction = (sequence) => ({
  type: CHANGE_PLAY_SEQUENCE,
  sequence,
})


// 设置歌词list
export const changeLyricListAction = (lyricList) => ({
  type: LYRICLIST,
  lyricList,
})

// 设置当前歌词 下标
export const changeCurrentLyricIndexAction = (currentLyricIndex) => ({
  type: CURRENTLYRICINDEX,
  currentLyricIndex
})

export const getSongsDetailAction = (id) => {
  return (dispatch, getState) => {

    // 播放列表
    const playList = getState().getIn(['player', 'playList'])
    let songIndex = playList.findIndex(song => song.id === id)
    if (songIndex !== -1) { // 该歌曲是在播放列表中
      dispatch(changeCurrentSongIndexAction(songIndex))
      dispatch(changeSongsDetailAction(playList[songIndex]))
      dispatch(getLyricListAction(playList[songIndex].id)) // 获取歌词 
    } else {// 该歌曲不存在播放列表中
      getSongDetail(id).then(res => {
        let song = res.songs && res.songs[0]
        if (!song) return;
        let newList = [...playList] // 这里浅拷贝的目的是为了 保证数据的唯一性 react 刷新组件 也是进行的浅层比较
        newList.push(song)

        dispatch(changeCurrentSongIndexAction(newList.length - 1)) // 更新下标
        dispatch(changePlayListAction(newList)) // 刷新播放列表
        dispatch(changeSongsDetailAction(song))
        dispatch(getLyricListAction(song.id)) // 获取歌词 
      })
    }
  }
}

// 控制下一首 上一首
export const changeCurrentIndexAndSongAction = (tag) => {
  return (dispatch, getState) => {
    let currentSong = getState().getIn(['player', 'currentSong'])
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    let playList = getState().getIn(['player', 'playList'])
    // 根据playSequence决定是顺序播放还是随机播放
    let playSequence = getState().getIn(['player', 'playSequence'])
    // playSequence: 0, // 0循环播放  1随机播放  2单曲循环
    switch (playSequence) {
      case 1: // 随机播放
        let newIndex = getRandomNumber(playList.length)

        while (newIndex === currentSongIndex) { // 若随机数相同则在册随机
          newIndex = getRandomNumber(playList.length)
        }
        currentSongIndex = newIndex
        break;

      default:  // 顺序播放
        currentSongIndex += tag
        // 判断当前音乐的下标是否超出播放列表长度
        if (currentSongIndex >= playList.length) currentSongIndex = 0;
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
        break;
    }

    dispatch(changeCurrentSongIndexAction(currentSongIndex)) // 修改播放下标
    dispatch(changeSongsDetailAction(playList[currentSongIndex])) // 修改播放的歌曲
    dispatch(getLyricListAction(playList[currentSongIndex].id)) // 获取歌词 
  }
}

export const getLyricListAction = (id) => {
  return (dispatch) => {
    getLyric(id).then(res => {
      console.log("getLyricListAction", res);
      const lyric = res.lrc && res.lrc.lyric
      const lyricList = parseLyric(lyric)
      dispatch(changeLyricListAction(lyricList))
    })
  }
}