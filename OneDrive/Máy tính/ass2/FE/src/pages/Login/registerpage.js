import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function RegisterPage({ handleTabChange }) {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usedEmail, setUsedEmail] = useState(false);
  // ... (your existing imports and code)

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const memberName = formData.get("memberName");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const yob = formData.get("yob");
    // Check if passwords match on the client side
    const userData = {
      name,
      memberName,
      password,
      yob
    };

    try {
      // Make the API request
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        userData
      );
      console.log(response.status);
      // Check the response status or data for success
      if (response.status === 201) {
        // Assuming 201 Created is the appropriate status for successful registration
        // Registration successful
        if (password !== confirmPassword) {
          setPasswordMatch(false);
          setUsedEmail(false)
          return;
        }
        setPasswordMatch(true);
        setUsedEmail(false);
        // Navigate to login page after successful registration
        handleTabChange("login");
      }
    } catch (error) {
      setUsedEmail(true);
      // Handle error (e.g., display an error message)
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <h1 style={{ fontSize: "2em", color: "#032B91" }}>Đăng ký</h1>
      </div>
      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group className="mb-2">
          <Form.Label style={{ fontFamily: "Work Sans" }}>Họ và tên</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập họ và tên"
            name="name"
            style={{ fontFamily: "Work Sans" }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label style={{ fontFamily: "Work Sans" }}>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập membername"
            name="memberName"
            style={{ fontFamily: "Work Sans" }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label style={{ fontFamily: "Work Sans" }}>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu..."
            name="password"
            style={{ fontFamily: "Work Sans" }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label style={{ fontFamily: "Work Sans" }}>
            Xác nhận mật khẩu
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Xác nhận mật khẩu..."
            name="confirmPassword"
            style={{ fontFamily: "Work Sans" }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label style={{ fontFamily: "Work Sans" }}>
            Năm sinh
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập yob..."
            name="yob"
            style={{ fontFamily: "Work Sans" }}
            required
          />
        </Form.Group>

        {usedEmail && (
          <div className="text-danger mb-2" style={{ fontFamily: "Work Sans" }}>
            Email đã được sử dụng !
          </div>
        )}

        {(!usedEmail && !passwordMatch) && (
          <div className="text-danger mb-2" style={{ fontFamily: "Work Sans" }}>
            Mật khẩu và xác nhận mật khẩu không khớp.
          </div>
        )}

        {/* Sign up button */}
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
          Đăng ký
        </Button>

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
        <div className="d-flex align-items-center justify-content-center mt-3">
          <span style={{ opacity: "0.5" }}>Bạn đã có tài khoản?</span> &nbsp;
          <Link to="/user/login">
            <span
              onClick={() => handleTabChange("login")}
              style={{
                color: "#31AAB7",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {" "}
              Đăng nhập
            </span>
          </Link>
        </div>
      </Form>
    </>
  );
}

export default RegisterPage;
