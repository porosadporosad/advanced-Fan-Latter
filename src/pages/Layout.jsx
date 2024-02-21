import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Layout() {
  const nav = useNavigate();

  // 로그아웃
  const LogoutClick = () => {
    window.localStorage.clear();
    nav("/login");
  };

  return (
    <>
      <LayoutBody>
        <LayoutLink to="/">HOME</LayoutLink>
        <LayoutDiv>
          <LayoutLink to="/profile">내 프로필</LayoutLink>
          <LayoutLogout onClick={LogoutClick}>로그아웃</LayoutLogout>
        </LayoutDiv>
      </LayoutBody>
      <Outlet />
    </>
  );
}

export default Layout;

const LayoutBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #dd0025;
  padding: 12px 24px;
  color: black;
`;

const LayoutDiv = styled.div`
  display: flex;
  gap: 12px;
`;

const LayoutLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: yellow;
  }
`;

const LayoutLogout = styled.div`
  cursor: pointer;
`;
