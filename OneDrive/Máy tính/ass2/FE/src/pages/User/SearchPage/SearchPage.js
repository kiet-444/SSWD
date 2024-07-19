import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import "./SearchPage.css";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import BookCard from "./BookCard";
import { useLocation, useParams } from "react-router-dom";

function SearchPage({ }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("query");
  const searchGenre = searchParams.get("genre");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/search?query=${searchText}`)
      .then((res) => {
        console.log(res.data);
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchText]);

  const [bookGenres, setBookGenres] = useState([]);

  useEffect(() => {
    const fetchBookGenres = async (ISBN) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/books/${ISBN}/genres`
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    const fetchBookGenresForSearchResults = async () => {
      const genresPromises = searchResults.map((book) =>
        fetchBookGenres(book.ISBN)
      );

      try {
        const genres = await Promise.all(genresPromises);
        setBookGenres(genres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookGenresForSearchResults();
  }, [searchResults]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");

  const categories = [
    "Adventure",
    "Historical-Fiction",
    "Horror",
    "Mystery",
    "Mythology",
    "Romance",
    'Thriller',
    'Crime',
    'Fiction',
    'Drama',
    'Action',

  ];
  const publishers = [
    "Atria Books",
    "Ballantine Books",
    "Canary Street Press",
    "Dutton",
    "Ecco",
    "Gallery Books",
    "Graydon House",
    "Harper Perennial",
    "Independently published",
    "Penguin Classics",
    "Scribner",
    "William Morrow",
  ];

  const handleCheckboxClick = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };
  const handleCheckboxClick2 = (publisher) => {
    if (publisher === selectedPublisher) {
      setSelectedPublisher("");
    } else {
      setSelectedPublisher(publisher);
    }
  };
  const [bookCount, setBookCount] = useState(0);
  const [totalBooks, setTotalBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => {
        console.log(res.data);
        setTotalBooks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    let count = 0;

    for (let i = 0; i < searchResults.length; i++) {
      const book = searchResults[i];
      const genreCondition =
        searchGenre !== null
          ? bookGenres[i] && bookGenres[i].includes(searchGenre)
          : (!selectedCategory || bookGenres[i].includes(selectedCategory)) &&
          (!selectedPublisher || book.publisher === selectedPublisher);

      if (genreCondition) {
        count++;
      }
    }

    setBookCount(count);
  }, [searchResults, searchGenre, selectedCategory, selectedPublisher]);
  return (
    <div className="custom-accordion">
      <Accordion className="accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header
            style={{
              fontFamily: "Work Sans, sans-serif",
              color: "rgba(0, 0, 0, 0.8)",
            }}
          >
            Filter by
          </Accordion.Header>

          <Accordion.Body>
            <hr />
            <div
              style={{
                fontFamily: "Work Sans, sans-serif",
                color: "rgba(0, 0, 0, 0.8)",
              }}
            >
              Categories
            </div>
            {categories.map((category) => (
              <Form.Check
                label={category}
                checked={
                  category === selectedCategory || category === searchGenre
                }
                onClick={() => handleCheckboxClick(category)}
                style={{
                  fontFamily: "Work Sans, sans-serif",
                  color: "#808080",
                }}
              />
            ))}
            <hr />
            <div style={{ fontFamily: "Work Sans, sans-serif" }}>
              Nhà xuất bản
            </div>
            {publishers.map((publisher) => (
              <Form.Check
                label={publisher}
                checked={publisher === selectedPublisher}
                onClick={() => handleCheckboxClick2(publisher)}
                style={{
                  fontFamily: "Work Sans, sans-serif",
                  color: "#808080",
                }}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="display">
        <div
          style={{
            fontFamily: "Work Sans, sans-serif",
            color: "#21717A",
            fontSize: 27.87,
            fontWeight: "500",
          }}
        >
          {searchGenre !== null ? (
            <div key={searchGenre}>{searchGenre}</div>
          ) : selectedCategory ? (
            <div key={selectedCategory}>{selectedCategory}</div>
          ) : null}
        </div>
        <div style={{ fontFamily: "Work Sans, sans-serif" }}>
          Hiển thị {bookCount} của {totalBooks.length} sản phẩm
        </div>

        <br />

        <Row>
          {(() => {
            const bookCols = [];
            for (let i = 0; i < searchResults.length; i++) {
              const book = searchResults[i];
              const genreCondition =
                searchGenre !== null
                  ? bookGenres[i] && bookGenres[i].includes(searchGenre)
                  : (!selectedCategory ||
                    bookGenres[i].includes(selectedCategory)) &&
                  (!selectedPublisher ||
                    book.publisher === selectedPublisher);

              if (genreCondition) {
                bookCols.push(
                  <Col
                    className="mb-5"
                    xs={6}
                    sm={6}
                    md={4}
                    lg={3}
                    key={book.ISBN}
                  >
                    <BookCard
                      ISBN={book.ISBN}
                      title={book.title}
                      authorName={book.authorName}
                      coverLink={book.coverLink}
                    />
                  </Col>
                );
              }
            }
            return bookCols;
          })()}
        </Row>

        {/* <Row>
          {(() => {
            const bookCols = [];
            for (let i = 0; i < searchResults.length; i++) {
              const book = searchResults[i];
              const genreCondition =
                searchGenre !== null
                  ? bookGenres[i] && bookGenres[i].includes(searchGenre)
                  : (!selectedCategory ||
                      bookGenres[i].includes(selectedCategory)) &&
                    (!selectedPublisher ||
                      book.publisher === selectedPublisher);

              if (genreCondition) {
                bookCols.push(
                  <Col
                    className="mb-5"
                    xs={6}
                    sm={6}
                    md={4}
                    lg={3}
                    key={book.ISBN}
                  >
                    <BookCard
                      ISBN={book.ISBN}
                      title={book.title}
                      authorName={book.authorName}
                      coverLink={book.coverLink}
                    />
                  </Col>
                );
              }
            }
            return bookCols;
          })()}
        </Row> */}
      </div>
    </div>
  );
}

export default SearchPage;
