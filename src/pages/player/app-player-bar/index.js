/*
 * @Author: web_XL
 * @Date: 2021-06-23 09:03:16
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-25 10:22:28
 * @Description:
 */
import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getSizeImage, formatDate, getPlayUrl } from '@/utils/format-utils.js';

import {
  PlayerbarWrapper,
  Control,
  PlayerInfo,
  Operator
} from './style'


import { Slider, Tooltip, message } from 'antd';
import { DownloadOutlined, UndoOutlined } from '@ant-design/icons';

import {
  getSongsDetailAction,
  changePlaySequenceAction,
  changeCurrentIndexAndSongAction,
  changeCurrentLyricIndexAction
} from './../store/actionCreators'



export default memo(function XLPlayerBar () {
  // state props
  const audioRef = useRef()
  const [currentTime, setCurrentTime] = useState(0)  // 歌曲当前播放的时间
  const [progress, setProgress] = useState(0) // 歌曲进度条的位置
  const [isChanging, setIsChanging] = useState(false) // 是否在滑动进度条
  const [isPlaying, setIsPlaying] = useState(false) // 是否正在播放



  // redux hooks
  const dispatch = useDispatch()
  const {
    currentSong,
    playSequence,
    lyricList,
    currentLyricIndex } = useSelector(state => ({
      currentSong: state.getIn(["player", "currentSong"]),
      playSequence: state.getIn(["player", "playSequence"]),
      lyricList: state.getIn(["player", "lyricList"]),
      currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
    }), shallowEqual)

  const picUrl = currentSong.al && currentSong.al.picUrl; // 图片url
  const songName = currentSong.name; // 歌曲名字
  const singerName = currentSong.ar && currentSong.ar[0].name; //作者名字
  const duration = currentSong.dt; //播放总时间
  const songUrl = getPlayUrl(currentSong.id); // 歌曲URL

  // other hooks
  useEffect(() => {
    dispatch(getSongsDetailAction(167876))
  }, [dispatch])

  useEffect(() => {
    audioRef.current.src = songUrl
    audioRef.current.play()
      .then(res => {
        setIsPlaying(true)
      })
      .catch(res => {
        setIsPlaying(false)
      })
  }, [audioRef, songUrl])

  // 切换歌曲时播放音乐
  // useEffect(() => {
  //   console.log("切换歌曲时播放音乐", isPlaying);
  //   isPlaying && audioRef.current.play();
  // }, [isPlaying]);

  // other handle


  /**
   * 播放音乐
   */
  const playMusic = useCallback(
    () => {
      // 播放音乐
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    },
    [isPlaying],
  )

  // 切换歌曲(点击播放下一首或上一首音乐)
  const changeSong = (tag) => {
    // 首先判断播放列表中是否存在音乐，再决定是否播放
    // if (playlistCount < 1) {
    //   message.error('请添加播放列表', 0.5);
    //   return;
    // }
    // 需要需要派发action,所以具体逻辑在actionCreator中完成
    dispatch(changeCurrentIndexAndSongAction(tag));
    // setIsPlaying(true + Math.random()); // 更改播放状态图标
  };

  /**
   * 监听音乐播放
   */
  const timeUpdate = (e) => {
    let time = e.target.currentTime

    if (!isChanging) {
      setCurrentTime(time * 1000)
      setProgress(time * 1000 / duration * 100)
    }


    // 当前播放的歌词
    let index = 0;
    for (; index < lyricList.length; index++) {
      const element = lyricList[index];
      if (time * 1000 < element.totalTime) break
    }

    index = index - 1 < 0 ? 0 : index - 1
    // 对dispatch进行优化,如果index没有改变,就不进行dispatch
    if (currentLyricIndex !== index) {
      dispatch(changeCurrentLyricIndexAction(index))
    }

    // 展示歌词
    const lyricContent = lyricList[index] && lyricList[index].content;
    lyricContent &&
      message.open({
        key: 'lyric',
        content: lyricContent,
        duration: 0,
        className: 'lyric-css',
      });

  }

  // 当前歌曲播放结束后
  function handleTimeEnd () {
    // 单曲循环
    if (playSequence === 2) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      // 播放下一首
      dispatch(changeCurrentIndexAndSongAction(1));
      // 更改播放状态
      setIsPlaying(true + Math.random());
    }
  }

  // 修改播放方式
  const changeSequence = () => {
    console.log("playSequence");
    let currentSequence = playSequence;
    currentSequence++;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changePlaySequenceAction(currentSequence));
  }

  // 滑动滑块时触发
  const sliderChange = useCallback((e) => {
    setIsChanging(true)
    // 设置播放时间
    setCurrentTime(e / 100 * duration)
    // 更改进度条值
    setProgress(e)
  }, [duration])

  // 手指抬起时触发
  const slideAfterChange = useCallback((e) => {
    let time = e / 100 * duration / 1000
    // 修改播放位置
    audioRef.current.currentTime = time

    setIsChanging(false)

    if (!isPlaying) {
      playMusic()
    }
  }, [duration, isPlaying, playMusic])



  return (
    <PlayerbarWrapper className="sprite_player" >
      <div className="w980 content">
        <Control isPlaying={isPlaying}>
          <button
            onClick={e => changeSong(-1)}
            className="sprite_player pre"
          ></button>
          <button className="sprite_player play" onClick={playMusic}></button>
          <button
            onClick={e => changeSong(1)}
            className="sprite_player next"
          ></button>
        </Control>
        <PlayerInfo>
          <NavLink
            to={{
              pathname: '/discover/song',
            }}
            className="image"
          >
            <img alt="" src={getSizeImage(picUrl, 35)} />
          </NavLink>
          <div className="play-detail">
            <div className="song-info">
              <NavLink to="/discover/song" className="song-name">
                {songName}
              </NavLink>
              <a href="/author" className="no-link singer-name">
                {singerName}
              </a>
            </div>
            <Slider
              defaultValue={0}
              value={progress}
              onChange={sliderChange}
              onAfterChange={slideAfterChange}
            />
          </div>
          <div className="song-time">
            <span className="now-time">{formatDate(currentTime, 'mm:ss')} </span>
            <span className="total-time">
              {' '}
              / {duration && formatDate(duration, 'mm:ss')}
            </span>
          </div>
        </PlayerInfo>
        <Operator playSequence={playSequence}>
          <div className="left">
            <Tooltip title="下载音乐">
              <a
                target="_blank"
                rel="noopener noreferrer"
              >
                <DownloadOutlined />
              </a>
            </Tooltip>
            <Tooltip title="重新播放">
              <UndoOutlined className="refresh" />
            </Tooltip>
          </div>
          <div className="right sprite_player">
            <Tooltip title="调节音量">
              <button
                className="sprite_player btn volume"
              ></button>
            </Tooltip>
            <Tooltip
              title={[
                '顺序播放',
                '随机播放',
                '单曲循环',
              ].filter((item, index) =>
                index === playSequence ? item : undefined
              )}
            >
              <button
                className="sprite_player btn loop"
                onClick={(e) => changeSequence()}
              ></button>
            </Tooltip>
            <button
              className="sprite_player btn playlist"
            // 阻止事件捕获,父元素点击事件,不希望点击子元素也触发该事件
            >
              {/* <Tooltip title="播放列表">
                <span>{playlistCount}</span>
              </Tooltip> */}
              {/* <CSSTransition
                in={isShowSlide}
                timeout={3000}
                classNames="playlist"
              >
                <SliderPlaylist
                  isShowSlider={isShowSlide}
                  playlistCount={playlistCount}
                  closeWindow={changePlaylistShow}
                  playMusic={forcePlayMusic}
                  changeSong={nextMusic}
                  isPlaying={isPlaying}
                />
              </CSSTransition> */}
            </button>
          </div>
          {/* Slide 音量条 */}
          <div
            className="sprite_player top-volume"
          >
            <Slider vertical defaultValue={30} />
          </div>
        </Operator>

        <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleTimeEnd} />
      </div>

    </PlayerbarWrapper>
  )
})
