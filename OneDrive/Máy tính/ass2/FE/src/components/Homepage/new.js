import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function New(props) {
  return (
    <div
      className="card"
      style={{
        marginRight: "5%",
        marginLeft: "5%",
        boxShadow: "2px 6px 8px 0 rgba(22, 22, 26, 0.18)",
      }}
    >
      <img className="product--image" src={props.coverLink} alt="img" style={{
    width: "100%",
    height: "260px", // Set your desired height
    objectFit: "cover", // or "contain" based on your preference
  }}/>

      <Link to={`/bookdetailpage/${props.ISBN}`}>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "#324552",
            fontSize: 14,
            fontFamily: "Work Sans",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          {props.title}
        </div>
      </Link>

      <div
        style={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "#7D92A1",
          fontSize: 12,
          fontFamily: "Work Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        {props.authorName}
      </div>

      <Link to={`/bookdetailpage/${props.ISBN}`}>
      <button
        className="btn btn-success"
        style={{
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "400",
          wordWrap: "break-word",
          backgroundColor: "#31AAB7",
        }}
      >
        Mượn
      </button>
    </Link>
    </div>
  );
}

export default New;
