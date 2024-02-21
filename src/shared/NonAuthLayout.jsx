import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// 비로그인
const NonAuthLayout = () => {
  const navigator = useNavigate();

  useEffect(() => {
    // 토큰이 있을 경우 홈으로
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigator("/");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default NonAuthLayout;
