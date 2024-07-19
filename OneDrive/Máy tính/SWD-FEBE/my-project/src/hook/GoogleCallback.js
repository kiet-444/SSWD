// GoogleCallback.js
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "context/LoginProvider";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { setUsername } = useContext(LoginContext);

  useEffect(() => {
    // Extract tokens from the URL query parameters or response
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    const username = urlParams.get("username");
    const role = urlParams.get("role");

    if (accessToken && refreshToken) {
      // Save tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUsername(username);

      // Redirect based on role
      if (role === "Admin") {
        navigate("/admin/");
      } else {
        navigate("/"); // Or any other route for non-admin users
      }
    } else {
      // Handle error or invalid tokens
      console.error("Invalid tokens");
    }
  }, [navigate, setUsername]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
