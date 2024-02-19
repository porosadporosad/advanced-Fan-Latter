import React from "react";
import styled from "styled-components";
import HeaderButton from "./HeaderButton";

function Header() {
  const players = [
    { player: "son", name: "손흥민" },
    { player: "kim", name: "김민재" },
    { player: "lee", name: "이강인" },
    { player: "hwang", name: "황희찬" },
  ];

  return (
    <HeaderStyle>
      <HeaderH1>축구국가대표팀 팬레터 콜렉션</HeaderH1>
      <HeaderDiv>
        {players.map((prev) => {
          return (
            <HeaderButton key={prev.player} player={prev.player}>
              {prev.name}
            </HeaderButton>
          );
        })}
      </HeaderDiv>
    </HeaderStyle>
  );
}

export default Header;

const HeaderStyle = styled.div`
  background-image: url("https://cdn.iminju.net/news/photo/202312/95537_96617_4853.jpg");
  height: 60vh;
  width: 100vw;
  background-position: center;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderH1 = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-top: 100px;
`;

const HeaderDiv = styled.div`
  border: 1px solid white;
  width: 500px;
  height: 80px;
  background-color: #3b3c3d;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;
