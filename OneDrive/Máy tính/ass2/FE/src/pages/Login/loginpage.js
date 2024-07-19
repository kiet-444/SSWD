import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import login1 from "../../assets/image/login1.png";
import login2 from "../../assets/image/login2.png";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function LoginPage(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const memberName = formData.get("memberName");
    const password = formData.get("password");
    // const name = formData.get("name");
    try {

      // Reader login
      let response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberName, password }),
      });
      if (response.ok) {
        // Assuming the server returns a user object with a token property
        const user = await response.json();
        // console.log(user);
        const token = user.token;

        console.log("admin:", user.isAdmin);

        if (user.isAdmin == true) {
          localStorage.setItem("admin", user.isAdmin);
        }


        // Store the token in localStorage or a more secure storage option
        localStorage.setItem("token", token);
        console.log(token);

        // Store email and password temporarily in localStorage

        localStorage.setItem("memberName", memberName);
        localStorage.setItem("userPassword", password);


        // localStorage.setItem("tempName", name);

        navigate('/')
      } else {
        // Handle login failure (e.g., display an error message)
        setErrorMessage("Incorrect email or password. Please try again.");
      }
    } catch (error) {
      // Handle error (e.g., display an error message)
      setErrorMessage("An error occurred while logging in. Please try again.");
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <h1 style={{ fontSize: "2em", color: "#032B91" }}>Đăng nhập</h1>
      </div>
      <Form onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontFamily: "Work Sans" }}>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập membername..."
            name="memberName"
            style={{ fontFamily: "Work Sans" }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="d-flex justify-content-between">
            <span style={{ fontFamily: "Work Sans" }}>Mật khẩu</span>
            <span>
              <a
                href="!#"
                style={{ color: "#7D92A1", fontFamily: "Work Sans" }}
              >
                Quên mật khẩu?
              </a>
            </span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu..."
            name="password"
            style={{ fontFamily: "Work Sans" }}
            required
          />
        </Form.Group>

        {/* Sign in button */}
        <Button
          type="submit"
          variant="primary"
          className="mb-2 w-100"
          style={{
            backgroundColor: "#31AAB7",
            color: "#FFFFFF",
            fontFamily: "Work Sans",
          }}
        >
          Đăng nhập
        </Button>

        {/* Display error message if login fails */}
        {errorMessage && (
          <div className="text-danger mb-2" style={{ fontFamily: "Work Sans" }}>
            {errorMessage}
          </div>
        )}

        <div className="f-flex justify-content-center position-relative">
          <hr />
          <div
            className="text-dark position-absolute ps-2 pe-2"
            style={{
              top: "42%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#eaeff2",
              fontFamily: "Work Sans",
            }}
          >
            Hoặc
          </div>
        </div>

        <Button
          variant="primary"
          className="w-100 mb-2"
          style={{ backgroundColor: "#FFFFFF", color: "#324552" }}
        >
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="img-fluid"
              src={login1}
              alt="img"
              style={{
                float: "left",
                paddingRight: "5px",
                display: "block",
                alignItems: "center",
                fontFamily: "Work Sans",
              }}
            ></img>
            Login with Google
          </div>
        </Button>

        <Button
          variant="primary"
          className="w-100 mb-2"
          style={{ backgroundColor: "#FFFFFF", color: "#324552" }}
        >
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="img-fluid"
              src={login2}
              alt="img"
              style={{
                float: "left",
                paddingRight: "5px",
                display: "block",
                alignItems: "center",
                fontFamily: "Work Sans",
              }}
            ></img>
            Login with Mobile number
          </div>
        </Button>

        {props.title === "user" && (
          <div className="d-flex align-items-center justify-content-center mt-3">
            <span style={{ opacity: "0.5" }}>Bạn chưa có tài khoản?</span>{" "}
            &nbsp;
            <Link to="/register">
              <span
                onClick={() => props.handleTabChange("login")}
                style={{
                  color: "#31AAB7",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {" "}
                Đăng ký
              </span>
            </Link>
          </div>
        )}
      </Form>
    </>
  );
}

export default LoginPage;
