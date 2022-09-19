import React,{useRef,useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

import "./css/now-playing.css";
import image from "./pages/images/music-1.jpg";
import { FiHeart } from "react-icons/fi";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";

const Nowplaying = ({data}) => {

  useEffect(() => {
    console.log("data from sibling",data);
    // console.log("data from sibling for first index",data[0]);

 
    console.log("length of an array",data.length);
  }, [data]);
 
  

  return (
    <>
      {/* Now Playing Box */}
      <div className="playing-box">
        <div className="box">
          <div className="upper-box">
            <div className="upper-box-title">Now Playing</div>
            <div className="upper-box-image">
              <img src={image} alt="" />
            </div>
            <div className="upper-songinfo">
              <div className="upper-songName" id="masterSongName"  >
                Believer  
              </div>
              <div className="upper-artistName" id="masterSongName">
                Imagine Dragons
              </div>
            </div>
            <div className="upper-progress-area">
              <div className="upper-progress-bar">
                <audio id="main-audio" src=""></audio>
              </div>
              <div className="upper-song-timer">
                <span className="upper-current-time">0:00</span>
                <span className="upper-max-duration">0:00</span>
              </div>
            </div>
            <div className="upper-icons">
              <MdOutlineKeyboardArrowLeft />
              <BsPlayFill />
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
         
          <div className="lower-box">
            <div className="lower-box-title">Queue</div>
            {Array.isArray(data)?data.map((content, index) => {
        
                return (
            <div className="lower-box-songlist">
              <div className="lower-songinfo">
                <div className="lower-song">
                  <div className="lower-box-songname" key={index}>{content.INST_NAME}</div>
                  <div className="lower-box-artistname" key={index}>{content.INST_ARTIST}</div>
                </div>
                <div className="lower-icon-play">
                  <FiHeart />{" "}
                </div>
              </div>
              
            </div>
              );
                }):null}    



          </div>
         
        </div>
      </div>
    </>
  );
};

export default Nowplaying;
