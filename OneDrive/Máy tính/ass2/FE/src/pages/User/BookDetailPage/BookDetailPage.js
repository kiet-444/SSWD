import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import "./BookDetailPage.css";
import useNode from "./useNode";
import Comment from "./Comment";
import ReadMore from "./ReadMore";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const comments = {
  id: 1,
  items: [],
};
export default function BookDetailPage() {
  const { ISBN } = useParams();

  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [commentsData, setCommentsData] = useState(comments);
  const [value, setValue] = useState(0);
  const { insertNode, editNode, deleteNode } = useNode();
  //pop up
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleBorrowClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  //

  // add/ remove fav list
  const [favBooks, setFavBooks] = useState([]);
  const email = localStorage.getItem("userEmail");
  console.log("email", email);
  const readerID = localStorage.getItem("userID");
  console.log("ID", readerID);
  const jwtToken = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/favorite/${readerID}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        console.log("Favor:", res.data);
        setFavBooks(res.data);
      })
      .catch((err) => { });
  }, []);

  const [isHearted, setIsHearted] = useState(false);
  const checkIsHearted = () => {
    const hasHeartedBook = favBooks.some((book) => book.ISBN === ISBN);
    setIsHearted(hasHeartedBook);
  };

  useEffect(() => {
    checkIsHearted();
  }, [favBooks]);

  const handleHeartClick = async (event) => {
    event.preventDefault();

    const readerId = localStorage.getItem("userID");

    const url = "http://localhost:3001/favorite";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ readerId, ISBN }),
      });
      if (response.status === 200) {
        const responseResult = await response.json();
        console.log(responseResult);

        if (isHearted) {
          alert("Xoá khỏi danh sách yêu thích");
        } else {
          alert("Thêm vào danh sách yêu thích");
        }

        setIsHearted(!isHearted);
      } else {
        console.error("failed to add to favorite");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  //borrow
  const [borrowDate, setBorrowDate] = React.useState(null);
  const [givebackDate, setGiveBackDate] = React.useState(null);



  const handleSubmitClick = async (event) => {
    event.preventDefault();

    const readerId = localStorage.getItem("userID");
    const url = "http://localhost:3001/borrow";
    const formattedBorrowDate = borrowDate.toISOString().slice(0, 10);
    const formattedGivebackDate = givebackDate.toISOString().slice(0, 10);

    
    console.log("formattedBorrowDate:", formattedBorrowDate);
    console.log("formattedGivebackDate:", formattedGivebackDate);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ISBN,
          readerId,
          borrowDate: formattedBorrowDate,
          givebackDate: formattedGivebackDate,
        }),
      });
      if (response.status === 200) {
        const responseResult = await response.json();
        console.log(responseResult);

        alert("Mượn thành công");
        setModalIsOpen(false);
        window.location.reload();

      } else {
        alert("Mượn không thành công, vui lòng nhập lại ngày hợp lệ");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };


  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/${ISBN}/genres`)
      .then((res) => {
        console.log(res.data);
        setGenres(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const book = books.find((b) => String(b.ISBN) === ISBN);
  if (!book) return null;

  return (
    <div className="display">
      <div>
        <img
          //src={require("../../../assets/image/book.png")}
          src={book.coverLink}
          alt="img"
          className="img"
        />

        <div className="text">
          {/* book title */}
          <p
            style={{
              fontSize: "40px",
              fontFamily: "Work Sans",
              fontWeight: "700",
              marginLeft: "10px",
            }}
          >
            {book.title}
          </p>
          <p
            style={{
              fontSize: "20px",
              fontFamily: "Work Sans",
              fontWeight: "700",
              marginLeft: "10px",
              color: isHearted ? "red" : "black",
              cursor: "pointer",
            }}
            onClick={handleHeartClick}
          >
            {isHearted ? "❤️" : "🤍"}
          </p>
          {/* rating */}

          <p>
            <div
              style={{
                color: "rgb(255, 200, 0)",
                fontSize: "24px",
                marginLeft: "10px",
                display: "inline-block",
              }}
            >
              &#9733;
            </div>
            <div
              style={{
                display: "inline-block",
                fontSize: "20px",
                fontFamily: "Work Sans",
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              4,8
            </div>
            <div
              style={{
                display: "inline-block",
                fontSize: "20px",
                fontFamily: "Work Sans",
                color: "grey",
                marginLeft: "10px",
              }}
            >
              (1,873)
            </div>
          </p>
          {/* author */}
          <p>
            <div
              style={{
                display: "inline-block",
                fontSize: "25px",
                fontFamily: "Work Sans",
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              Tác giả
            </div>
            <div
              style={{
                display: "inline-block",
                fontSize: "20px",
                fontFamily: "Work Sans",
                color: "grey",
                marginLeft: "10px",
              }}
            >
              {book.authorName}
            </div>
          </p>
          {/* genres */}
          <p>
            <div
              style={{
                display: "inline-block",
                fontSize: "25px",
                fontFamily: "Work Sans",
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              Thể loại
            </div>
            <div
              style={{
                display: "inline-block",
                fontSize: "20px",
                fontFamily: "Work Sans",
                color: "grey",
                marginLeft: "10px",
              }}
            >
              <div>
                {genres.map((genre, index) => (
                  <React.Fragment key={index}>
                    {genre}
                    {index !== genres.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </p>
          {/* publisher */}
          <p>
            <div
              style={{
                display: "inline-block",
                fontSize: "25px",
                fontFamily: "Work Sans",
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              Nhà xuất bản
            </div>
            <div
              style={{
                display: "inline-block",
                fontSize: "20px",
                fontFamily: "Work Sans",
                color: "grey",
                marginLeft: "10px",
              }}
            >
              {book.publisher}
            </div>
          </p>
          {/*  button mượn */}
          <p>
            <button
              className="btn btn-success "
              style={{
                width: "200px",
                textAlign: "center",
                color: "white",
                fontSize: 20,
                fontFamily: "Work Sans",
                fontWeight: "400",
                wordWrap: "break-word",
                backgroundColor: "#31AAB7",
                //marginTop: "175px",
                marginLeft: "10px",
              }}
              onClick={handleBorrowClick}
            >
              Mượn sách
            </button>

            {/* <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Mượn sách"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                  width: "350px",
                  height: "300px",
                  margin: "auto",
                },
              }}
            >
              <h2>Đăng ký mượn sách</h2>
              <label>Ngày mượn (yyyy-mm-dd)</label>
              <DatePicker
                selected={borrowDate}
                onChange={(date) => setBorrowDate(date)}
                dateFormat="yyyy-MM-dd"
                //readOnly
              />

              <label>Ngày trả (yyyy-mm-dd)</label>
              <DatePicker
                selected={givebackDate}
                onChange={(date) => setGiveBackDate(date)}
                dateFormat="yyyy-MM-dd"
                //readOnly
              />

              <div style={{ marginTop: "20px" }}>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  id="btn-outline-primary"
                  onClick={closeModal}
                  style={{ marginRight: "70px" }}
                >
                  <b>Huỷ</b>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  id="btn-outline-primary"
                  onClick={handleSubmitClick}
                >
                  <b>Mượn</b>
                </button>
              </div>
            </Modal> */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Mượn sách"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                  width: "500px",
                  height: "400px",
                  margin: "auto",
                },
              }}
            >
              <h2 style={{ textAlign: 'center' }}>Đăng ký mượn sách</h2>
              <div style={{ alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', alignItems: 'center' }}>
                  <label style={{ marginRight: '30px' }}>Ngày mượn:</label>
                  <DatePicker
                    selected={borrowDate}
                    onChange={(date) => {
                      setBorrowDate(date);
                      // Calculate Ngày trả as Ngày mượn + 2 weeks
                      const newGiveBackDate = new Date(date);
                      newGiveBackDate.setDate(newGiveBackDate.getDate() + 14); // 14 days = 2 weeks
                      setGiveBackDate(newGiveBackDate);
                    }}
                    dateFormat="yyyy-MM-dd"
                    style={{ width: "100%" }}
                  />

                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', alignItems: 'center' }} >
                  <label style={{ marginRight: '52px', alignItems: 'center' }}>Ngày trả:</label>
                  <DatePicker
                    selected={givebackDate}
                    disabled
                    dateFormat="yyyy-MM-dd"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: "60px" }}>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  id="btn-outline-primary"
                  onClick={closeModal}
                  style={{ marginRight: "70px" }}
                >
                  <b>Huỷ</b>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  id="btn-outline-primary"
                  onClick={handleSubmitClick}
                >
                  <b>Mượn</b>
                </button>
              </div>
            </Modal>

          </p>
        </div>
      </div>
      {/* mô tả */}
      <div className="description">
        <p>
          <div
            style={{
              fontSize: "25px",
              fontFamily: "Work Sans",
              fontWeight: "600",
              //marginLeft: "10px",
            }}
          >
            Mô tả
          </div>

          <div
            style={{
              fontSize: "20px",
              fontFamily: "Work Sans",
              color: "grey",
              //marginLeft: "10px",
            }}
          >
            <ReadMore text={book.desc} />
          </div>
        </p>
      </div>

      <div
        className="feedback"
        style={{
          fontSize: "25px",
          fontFamily: "Work Sans",
          fontWeight: "600",
          marginTop: "10px",
        }}
      >
        Phản hồi
      </div>
      <div style={{ marginTop: "20px" }}>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>

      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
    </div>
  );
}
