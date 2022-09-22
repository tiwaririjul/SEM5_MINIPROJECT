import SideBar from "../SideBar";
import { useEffect, useState, useRef } from "react";
import Nowplaying from "../Nowplaying";
import "../css/liked.css";
const Liked = (props) => {
  const [likeSongs, setLikeSongs] = useState([
    { id: "", type: "", artist: "", song: "", image: "" },
  ]);

  useEffect(() => {
    fetch("http://localhost:4000/likeddata")
      .then((res) => res.json())
      .then((jsonRes) => setLikeSongs(jsonRes))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("my liked song", likeSongs);
  }, [likeSongs]);

  const audioElem = useRef();

  // const playLikedSong = () => {
  //   console.log("playing.........");
  //   console.log(audioElem.current);
  //   audioElem.current.play();
  // };

  // deleting

  const deleteSong = async (artist) => {
    const res = await fetch("/deletesong", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artist: artist,
      }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);

    if (res.json({ message: "removed" })) {
      window.alert(
        "removed from the favourite list refresh the page to see the changes"
      );
    }
  };

  return (
    <>
      <SideBar>
        <div className="main-body">
          <div className="middle-lb">
            <div className="lower-box-title">Liked Songs</div>
            <div className="lower-box-songlist middle-lb-songlist">
              {likeSongs.map((data, key) => {
                return (
                  <div className="lower-songinfo">
                    <div className="lower-song">
                      <div className="lower-box-songname">
                        {data.LIKED_SONG_ARTIST}
                      </div>
                      <audio controls src={data.LIKED_SONG_SONG}></audio>

                      {/* <audio src={data.LIKED_SONG_SONG} ref={audioElem} /> */}
                      {/* <i class="fa-solid fa-play" onClick={playLikedSong}></i> */}
                      <div className="lower-box-artistname">
                        {data.LIKED_SONG_TYPE}
                      </div>
                    </div>
                    <div className="lower-icon-play"></div>
                    <i
                      class="fa-solid fa-trash"
                      onClick={() => deleteSong(data.LIKED_SONG_ARTIST)}
                    ></i>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SideBar>
    </>
  );
};

export default Liked;
