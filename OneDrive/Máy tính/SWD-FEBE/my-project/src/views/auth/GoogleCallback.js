import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    const role = urlParams.get("role");
    const name = urlParams.get("name");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Điều hướng dựa vào role
      console.log(role);
      if (role === "Admin") {
        navigate("/admin");
      }else if(role === "staff") {
        navigate("/home");
      } else {
        navigate("/auth");
      }
    }
  }, [location, navigate]);

  return null; // Hoặc bạn có thể hiển thị một spinner hoặc màn hình loading ở đây
};

export default GoogleCallback;
