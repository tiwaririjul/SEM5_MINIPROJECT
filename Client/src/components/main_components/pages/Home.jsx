import * as React from "react";
import { useEffect, useState } from "react";
import image from "../HomePageImg/INS1.jpg";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Nowplaying from "../Nowplaying";
import "../css/Home.css";
import SideBar from "../SideBar";

const sideScroll = (element, speed, distance, step) => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    element.scrollLeft += step;
    scrollAmount += Math.abs(step);
    if (scrollAmount >= distance) {
      clearInterval(slideTimer);
    }
  }, speed);
};

const arrowcss = { fontSize: "25px", borderRadius: "5px", top: "43%" };

const Home = (props) => {
  const [musicData, setMusicData] = useState([]);

  const handleSong = (id, type, artist, song, image) => {
    const musicArray = [id, type, artist, song, image];
    setMusicData(musicArray);
    props.music(musicData);
    console.log(musicData);
  };

  const [music, setMusic] = useState([
    {
      INST_ID: "",
      INST_TYPE: "",
      INST_ARTIST: "",
      INST_SONG: "",
      INST_IMAGE: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:4000/songdata")
      .then((res) => res.json())
      .then((jsonRes) => setMusic(jsonRes));
  }, []);

  useEffect(() => {
    console.log(music);
  }, [music]);

  let navigate = useNavigate();
  const callHomePage = async () => {
    try {
      const res = await fetch("/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/home");
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  const contentWrapper = React.useRef(null);
  const contentWrapper2 = React.useRef(null);
  const contentWrapper3 = React.useRef(null);

  return (
    <>
      <SideBar>
        <div className="main-body">
          {/* center-upper box */}
          <div className="center-upper-box">
            <div
              className="left-arrow"
              onClick={() => {
                sideScroll(contentWrapper.current, 0, 1000, -540);
              }}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div
              className="right-arrow"
              onClick={() => {
                sideScroll(contentWrapper.current, 0, 1000, 540);
              }}
            >
              <MdOutlineKeyboardArrowRight />
            </div>
            <div className="c-box" ref={contentWrapper}>
              {music.map((data, key) => {
                return (
                  <>
                    <div className="c1 c">
                      <img
                        key={data.INST_ID}
                        src={data.INST_IMAGE}
                        onClick={() =>
                          handleSong(
                            data.INST_ID,
                            data.INST_TYPE,
                            data.INST_ARTIST,
                            data.INST_SONG,
                            data.INST_IMAGE
                          )
                        }
                        alt="rijul"
                      />
                    </div>
                  </>
                  // C:\SEM_5_MINIPROJECT\Music_Player\logreg1\src\components\main_components\HomePageImg\INS1.
                  // logreg1\src\components\main_components\HomePageImg\classical-bamboo-pan-flute-vector-1290317.jpg
                );
              })}
            </div>
          </div>
          {/* center-lower box */}
          <div className="center-upper-box">
            <div
              className="left-arrow"
              onClick={() => {
                sideScroll(contentWrapper2.current, 0, 0, -600);
              }}
              style={arrowcss}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div
              className="right-arrow"
              onClick={() => {
                sideScroll(contentWrapper2.current, 0, 1000, 600);
              }}
              style={arrowcss}
            >
              <MdOutlineKeyboardArrowRight />
            </div>
            <div className="top-tier">
              <p className="category">New Releases</p>
              <p className="smore">see more...</p>
            </div>
            <div className="c-box" ref={contentWrapper2}>
              {music.map((data) => {
                return (
                  <>
                    <div className="c2 c">
                      <img
                        key={data.INST_ID}
                        src={data.INST_IMAGE}
                        alt="rijul"
                        onClick={() => {
                          handleSong(
                            data.INST_ID,
                            data.INST_TYPE,
                            data.INST_ARTIST,
                            data.INST_SONG,
                            data.INST_IMAGE
                          );
                        }}
                      />
                      <div className="scontent">
                        <div className="sname">{data.INST_TYPE}</div>
                        <div className="sartist">{data.INST_ARTIST}</div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {/* center-lower box */}
          <div className="center-upper-box">
            <div
              className="left-arrow"
              onClick={() => {
                sideScroll(contentWrapper3.current, 0, 0, -500);
              }}
              style={arrowcss}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div
              className="right-arrow"
              onClick={() => {
                sideScroll(contentWrapper3.current, 0, 0, 500);
              }}
              style={arrowcss}
            >
              <MdOutlineKeyboardArrowRight />
            </div>
            <div className="top-tier">
              <p className="category">Artist</p>
              <p className="smore">see more..</p>
            </div>
            <div className="c-box" ref={contentWrapper3}>
              {music.map((data) => {
                return (
                  <>
                    <div className="c3 c">
                      <img
                        src={data.INST_IMAGE}
                        alt="rijul"
                        onClick={() => {
                          handleSong(
                            data.INST_ID,
                            data.INST_TYPE,
                            data.INST_ARTIST,
                            data.INST_SONG,
                            data.INST_IMAGE
                          );
                        }}
                      />
                      <div className="scontent">
                        <div className="sname">{data.INST_TYPE}</div>
                        <div className="sartist">{data.INST_ARTIST}</div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        {/* <Nowplaying /> */}
      </SideBar>
    </>
  );
};

export default Home;
