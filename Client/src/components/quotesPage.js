import React, { useState, useEffect } from "react";
import "./quotesPage.css";
import image from "./images/index.png";
import { useNavigate } from "react-router-dom";

const QuotesPage = () => {
  const [quotes, setQuotes] = useState("");
  let navigate = useNavigate();

  return (
    <>
      <a href="/home">Home</a>
    </>
  );
};

export default QuotesPage;
