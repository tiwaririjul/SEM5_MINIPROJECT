import { FiHeart } from "react-icons/fi";
import SideBar from "../SideBar";
import React, { useState, useEffect } from "react";

const Trends = () => {
  const [music, setMusic] = useState([
    {
      ID: "",
      NAME: "",
      ARTIST: "",
      SONG: "",
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
  return (
    <>
      <SideBar>
        <div className="main-body">
          <div className="middle-lb">
            <div className="lower-box-title">Trending....</div>
            <div className="lower-box-songlist middle-lb-songlist">
              {music.map((data, key) => {
                return (
                  <div className="lower-songinfo">
                    <div className="lower-song">
                      <div className="lower-box-songname">{data.NAME}</div>
                      <audio controls key={data.ID}>
                        <source src={`${data.SONG}`} type="audio/mp3" />
                      </audio>
                      <div className="lower-box-artistname">{data.ARTIST}</div>
                    </div>
                    <div className="lower-icon-play">
                      <FiHeart />{" "}
                    </div>
                  </div>
                );
              })}
              +
            </div>
          </div>
        </div>
      </SideBar>
    </>
  );
};

export default Trends;
