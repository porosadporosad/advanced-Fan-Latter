import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const [isRendered, setIsRendered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // 토큰이 없는 경우 강제 routing
    if (!token) {
      navigate("/login");
    }

    setIsRendered(true);
  }, []);

  if (!isRendered) {
    return;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
