import bookIcon from "../../../assets/image/bookIcon.png";
import userIcon from "../../../assets/image/userIcon.png";
import borrowIcon from "../../../assets/image/borrowIcon.png";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function GeneralInfo() {
  const [generalInfo, setgeneralInfo] = useState([
    { readerCount: 0, bookCount: 0, borrowCount: 0, givebackCount: 0 },
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/borrow/dashboard/general-info")
      .then((res) => {
        setgeneralInfo(res.data);
        console.log(generalInfo);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  console.log("GENERAL INFO", generalInfo);
  return (
    <>
      <div className="col">
        <div className="d-flex flex-nowrap p-3 shadow rounded border border-secondary">
          <div style={{ width: "fit-content" }}>
            <img
              src={userIcon}
              className="img-fluid"
              style={{ width: "75px", height: "75px" }}
              alt="icon"
            />
          </div>
          <div
            className="card-body"
            style={{ width: "calc(100% - 90px)", textAlign: "end" }}
          >
            <h5 className="text-secondary">Tổng số người dùng</h5>
            <p className="mt-4 fw-bold">{generalInfo[0].readerCount}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="d-flex flex-nowrap p-3 shadow rounded border border-secondary">
          <div style={{ width: "fit-content" }}>
            <img
              src={bookIcon}
              className="img-fluid"
              style={{ width: "75px", height: "75px" }}
              alt="icon"
            />
          </div>
          <div
            className="card-body"
            style={{ width: "calc(100% - 90px)", textAlign: "end" }}
          >
            <h5 className="text-secondary">Tổng số sách</h5>
            <p className="mt-4 fw-bold">{generalInfo[0].bookCount}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="d-flex flex-nowrap p-3 shadow rounded border border-secondary">
          <div style={{ width: "fit-content" }}>
            <img
              src={borrowIcon}
              className="img-fluid"
              style={{ width: "75px", height: "75px" }}
              alt="icon"
            />
          </div>
          <div
            className="card-body"
            style={{ width: "calc(100% - 90px)", textAlign: "end" }}
          >
            <h5 className="text-secondary">Số lượt mượn / trả</h5>
            <p className="mt-4 fw-bold">
              {generalInfo[0].borrowCount}/{generalInfo[0].givebackCount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
