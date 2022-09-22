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
  const [currentSong, setCurrentSong] = useState(song[1]);
  console.log("your currentTTTTTTTTTT", song);

  // console.log(props.data);
  const audioElem = useRef();
  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);

  // seekbar

  let seeking = useRef();
  let total_duration = useRef();
  let current_duration = useRef();

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    let progress = (ct / duration) * 100;
    seeking.current.style.width = `${progress + "%"}`;

    // total duration

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    if (sec_duration < 10) {
      sec_duration = `0${sec_duration}`;
    }
    if (min_duration < 10) {
      min_duration = `0${min_duration}`;
    }
    if (duration) {
      total_duration.current.innerText = `${min_duration}:${sec_duration}`;
    }

    //current Time
    let min_currentTime = Math.floor(ct / 60);
    let sec_currentTime = Math.floor(ct % 60);
    if (sec_currentTime < 10) {
      sec_currentTime = `0${sec_currentTime}`;
    }
    if (min_currentTime < 10) {
      min_currentTime = `0${min_currentTime}`;
    }

    if (ct) {
      current_duration.current.innerHTML = `${min_currentTime}:${sec_currentTime}`;
    }
  };

  let widthref = useRef();
  // play music while clicking on progress bar
  const widthCheck = (e) => {
    console.log(e);
    const offset = e.nativeEvent.offsetX;
    let width = widthref.current.clientWidth;
    let duration = audioElem.current.duration;
    let move_progress = (offset / width) * duration;
    audioElem.current.currentTime = move_progress;
  };

  const favourite = async (Id, type, artist, song, image) => {
    console.log("liked info", Id, type, artist, song, image);
    const res = await fetch("/liked", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: Id,
        type: type,
        artist: artist,
        song: song,
        image: image,
      }),
    });

    const resp = await res.json();
    console.log(resp);
    if (res.status === 422 || !resp) {
      window.alert("song allready saved");
    } else {
      window.alert("song saved");
    }
  };

  return (
    <>
      {/* Now Playing Box */}
      <div className="playing-box">
        <div className="box">
          <div className="upper-box">
            <div className="upper-box-title">Now Playing</div>
            <div className="upper-box-image">
              <img src={song[4]} alt="" />
            </div>
            <div className="upper-songinfo">
              <div className="upper-songName" id="masterSongName"></div>
              <div className="upper-artistName" id="masterSongName"></div>
            </div>

            <div
              className="upper-progress-area"
              ref={widthref}
              onClick={widthCheck}
            >
              <div className="upper-progress-bar" ref={seeking}>
                <div className="seek_bar">
                  <audio
                    src={song[3]}
                    ref={audioElem}
                    onTimeUpdate={onPlaying}
                  />
                </div>
              </div>
              <div className="upper-song-timer">
                <span className="upper-current-time" ref={current_duration}>
                  0:00
                </span>
                <span className="upper-max-duration" ref={total_duration}>
                  0:00
                </span>
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
              <i
                class="fa-solid fa-heart"
                onClick={() => {
                  favourite(song[0], song[1], song[2], song[3], song[4]);
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nowplaying;
