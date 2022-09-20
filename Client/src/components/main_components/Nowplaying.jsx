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
  const [isPlaying, setisPlaying] = useState(false);

  const playMusic = useRef(null);
  const PP = useRef(null);

  console.log(props.data);

  // const isPlaying = true;
  const song = props.data;

  let audioElem = new Audio(song[3]);
  console.log(song);

  // useEffect(() => {
  //   if (isPlaying) {
  //     if (audioElem.paused || audioElem.currentTime <= 0) {
  //       console.log("play");
  //       audioElem.play();
  //     }
  //   } else {
  //     console.log("pause");
  //     audioElem.pause();
  //   }
  // }, []);

  // const playpause = () => {
  //   setisPlaying(!isPlaying);
  // };

  const play = () => {
    setisPlaying(!isPlaying);
    audioElem.play();
  };
  const pause = () => {
    // audioElem.pause();
    console.log("paused");
    setisPlaying(isPlaying);
    audioElem.pause();
  };

  // useEffect(() => {
  //   if (isPlaying) {
  //     audioElem.play();
  //   } else {
  //     audioElem.pause();
  //   }
  // }, []);

  const handleSong = () => {
    if (audioElem.paused || audioElem.currentTime <= 0) {
      console.log("played");
      // setisPlaying(true);
      play();
    } else {
      console.log("paused");
      // audioElem.pause();
      pause();
      // setisPlaying(false);
      // audioElem.play();
    }
  };

  // seekbar

  const seek = useRef(null);

  const seekTime = () => {
    const progress = parseInt(audioElem.currentTime / audioElem.duration);
    seek.value = progress;
  };

  const changeSeek = () => {
    audioElem.currentTime = (seek.value * audioElem.duration) / 100;
  };

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

            {/* <audio autoplay ref={playMusic} controls src={song[3]}></audio> */}

            <div className="upper-progress-area">
              <div
                className="upper-progress-bar"
                ref={seek}
                onTimeUpdate={seekTime}
                onChange={changeSeek}
                style={{ width: `${currentSong.progress + "%"}` }}
              >
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
              {isPlaying ? (
                <BsPauseFill onClick={handleSong} ref={PP} />
              ) : (
                <BsPlayFill onClick={handleSong} />
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
