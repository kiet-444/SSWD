import React, { useEffect, useState } from "react";
import Book from "../../assets/image/book.png";
import axios from "axios";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function Category(props) {
  return (
    <div
      className="card"
      style={{
        marginRight: "5%",
        marginLeft: "5%",
        boxShadow: "2px 6px 8px 0 rgba(22, 22, 26, 0.18)",
      }}
    >
      <img
        className="product--image"
        src={props.coverLink}
        alt="img"
        style={{
          width: "100%",
          height: "260px", // Set your desired height
          objectFit: "cover", // or "contain" based on your preference
        }}
      />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "100%",
          color: "#324552",
          fontSize: 18,
          fontFamily: "Work Sans",
          fontWeight: "600",
          wordWrap: "break-word",
        }}
      >
        {props.genre}
      </div>
      <Link to={`/searchpage?query=${""}&genre=${props.genre}`}>
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
          Xem thêm
        </button>
      </Link>
    </div>
  );
}

export default Category;
