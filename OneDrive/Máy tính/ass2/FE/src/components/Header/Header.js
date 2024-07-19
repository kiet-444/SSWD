import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import "./Header.css";
// import hcmt from "../../assets/image/hcmt.png";
import { BsBell, BsSearch } from "react-icons/bs";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const Header = () => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const memberName = localStorage.getItem("memberName");
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");

  const admin = localStorage.getItem("admin");





  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Fetch notifications with authorization
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/borrow/notification/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        }
      );

      setNotifications(response.data);
      console.log("Notifications:", response.data); // Log notifications
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);


  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchpage?query=${searchText}`);
  };

  const handleLogout = (e) => {
    localStorage.clear();
    window.location.href = "/";
  };
  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: 6,
      top: 10,
      border: "2px solid",
      padding: "0 4px",
    },
  }));

  return (
    <Navbar
      bg="#ffffff"
      variant="light"
      expand="lg"
      className="border-bottom pe-4"
    >
      <>
        <Link to="/">
          <Navbar.Brand>
            <div className="d-inline-block ms-4 me-2">
              <img
                // alt="img"
                // src={hcmt}
              //className="d-inline-block"
              />
            </div>
            <span className="d-inline-block align-bottom">
              <span
                style={{
                  color: "#032B91",
                  fontSize: 40,
                  fontFamily: "Train One",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                Watch
              </span>
              <span
                style={{
                  color: "#1488DB",
                  fontSize: 40,
                  fontFamily: "Train One",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                Store
              </span>
            </span>
          </Navbar.Brand>
        </Link>
      </>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <>
          <Col
            xs={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form
              inline={+true}
              style={{ display: "flex", width: "90%" }}
              onSubmit={handleSubmit}
            >
              <Row style={{ display: "flex", flexWrap: "nowrap", width: "100%" }}>
                <Col
                  xs="10"
                  style={{
                    width: "100%",
                    paddingRight: "0",
                    color: "#566976",
                    fontSize: 16.26,
                    fontFamily: "Work Sans",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Tìm kiếm"
                    className=" mr-sm-2 rounded-0"
                    onChange={handleSearchChange}
                  />
                </Col>
                <Col xs="2" style={{ paddingLeft: "0" }}>
                  <Button
                    type="submit"
                    className="rounded-0"
                    style={{ backgroundColor: "#31AAB7" }}
                  >
                    <BsSearch />
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <Nav style={{ display: "flex", alignItems: "center" }}>

              {!memberName ? (
                <>

                  <Nav.Item>
                    <Button
                      variant="light"
                      className="border-success ms-2 me-4"
                      style={{ backgroundColor: "white", color: "#21717A" }}
                    >
                      <Link
                        to="/login"
                        style={{ textDecoration: "none" }}
                      >
                        <span
                          style={{
                            textAlign: "center",
                            color: "#21717A",
                            fontSize: 16.26,
                            fontFamily: "Work Sans",
                            fontWeight: "400",
                            wordWrap: "break-word",
                          }}
                        >
                          Đăng nhập
                        </span>
                      </Link>
                    </Button>
                  </Nav.Item>
                  <Nav.Item>
                    <Button
                      variant="light"
                      className="border-success ms-2 me-4"
                      style={{ backgroundColor: "white", color: "#21717A" }}
                    >
                      <Link to="/register" style={{ textDecoration: "none" }}>
                        <span
                          style={{
                            textAlign: "center",
                            color: "#21717A",
                            fontSize: 16.26,
                            fontFamily: "Work Sans",
                            fontWeight: "400",
                            wordWrap: "break-word",
                          }}
                        >
                          Đăng kí
                        </span>
                      </Link>
                    </Button>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Dropdown>
                    <Dropdown.Toggle className="bg-transparent text-dark border-0">
                      <img
                        src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                        alt="Avatar"
                        className="avatar"
                        style={{
                          verticalAlign: "middle",
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      {username}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="py-0" align="end">
                      <Link to="/profile" style={{ textDecoration: "none" }}>
                        <Dropdown.Item
                          href="#/action-1"
                          style={{
                            width: "100%",
                            height: "100%",
                            color: "#566976",
                            lineHeight: "2",
                            fontSize: 20,
                            fontFamily: "Work Sans",
                            fontWeight: "500",
                            wordWrap: "break-word",
                          }}
                          className="dropdown-item-link"
                        >
                          Thông tin tài khoản
                        </Dropdown.Item>
                      </Link>
                      {admin &&
                        <Link to="/admin/users" style={{ textDecoration: "none" }}>
                          <Dropdown.Item
                            href="#/action-3"
                            style={{
                              width: "100%",
                              height: "100%",
                              color: "#566976",
                              lineHeight: "2",
                              fontSize: 20,
                              fontFamily: "Work Sans",
                              fontWeight: "500",
                              wordWrap: "break-word",
                            }}
                            className="dropdown-item-link"
                          >
                            Dashboard
                          </Dropdown.Item>
                        </Link>}

                      <Link to="/" style={{ textDecoration: "none" }}>
                        <Dropdown.Item
                          onClick={(e) => handleLogout(e)}
                          className="text-center text-danger dropdown-item-link"
                          style={{ fontFamily: "Work Sans" }}
                        >
                          Đăng xuất
                        </Dropdown.Item>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Nav>
          </Col>
        </>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;