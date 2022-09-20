import React, { useState, useEffect } from "react";
import "./css/now-playing.css";

import image from "./pages/images/music-1.jpg";
import { FiHeart } from "react-icons/fi";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";
import { BsPauseFill } from "react-icons/bs";
import { useRef } from "react";

const Nowplaying = (props) => {
  const song = props.data;

  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(song);
  console.log("your current", currentSong);

  console.log(props.data);
  const audioElem = useRef();
  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  // const play = () => {
  //   setisPlaying(!isPlaying);
  //   audioElem.play();
  // };
  // const pause = () => {
  //   console.log("paused");
  //   setisPlaying(isPlaying);
  //   audioElem.pause();
  // };

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);

  const checkWidth = (e) => {
    console.log(" on check width");
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const onPlaying = () => {
    console.log("tumchya current song", currentSong);
    console.log(" on onPlaying");
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    // console.log(duration, ct);

    // setCurrentSong([
    //   ...currentSong,
    //   progress: (ct / duration) * 100,
    //   length: duration,
    // ]);
    const progress = (ct / duration) * 100;
    const length = duration;

    setCurrentSong([...currentSong, progress, length]);

    console.log("My current song", currentSong);

    // console.log(currentSong);
  };

  //checkwidth

  // const handleSong = () => {
  //   if (audioElem.paused || audioElem.currentTime <= 0) {
  //     console.log("played");
  //     // setisPlaying(true);
  //     play();
  //   } else {
  //     console.log("paused");
  //     // audioElem.pause();
  //     pause();
  //     // setisPlaying(false);
  //     // audioElem.play();
  //   }
  // };

  // seekbar

  return (
    <>
      {/* Now Playing Box */}
      <div className="playing-box">
        <div className="box">
          <div className="upper-box">
            <div className="upper-box-title"> </div>
            <div className="upper-box-image">
              <img src={song[4]} alt="" />
            </div>
            <div className="upper-songinfo">
              <div className="upper-songName" id="masterSongName"></div>
              <div className="upper-artistName" id="masterSongName"></div>
            </div>

            <audio src={song[3]} ref={audioElem} onTimeUpdate={onPlaying} />

            <div className="upper-progress-area">
              <div
                className="upper-progress-bar"
                onClick={checkWidth}
                ref={clickRef}
                // style={{ width: `${currentSong.progress + "%"}` }}
              >
                <div
                  className="seek_bar"
                  style={{ width: `${currentSong.progress + "%"}` }}
                ></div>

                {/* <audio
                  id="main-audio"
                  src=""
                  style={{ width: `${audioElem.progress + "%"}` }}
                  ref={elem}
                  onTimeUpdate={onPlaying}
                ></audio> */}
              </div>
              <div className="upper-song-timer">
                <span className="upper-current-time">0:00</span>
                <span className="upper-max-duration">0:00</span>
              </div>
            </div>
            <div className="upper-icons">
              <MdOutlineKeyboardArrowLeft />
              {isplaying ? (
                <BsPauseFill onClick={PlayPause} />
              ) : (
                <BsPlayFill onClick={PlayPause} />
              )}

              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nowplaying;
