import React, { useState, useEffect } from "react";
import axios from "axios";
const Working = () => {
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
      .then((jsonRes) => console.log(jsonRes))
      .catch((err) => console.log(err));
  }, []);

  return <></>;
};

export default Working;
