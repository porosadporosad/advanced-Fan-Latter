import React, { useState } from "react";
import styled from "styled-components";
import { ImgDiv, ImgStyle, SectionStyle } from "components/Context";
import { useNavigate, useParams } from "react-router-dom";
import { userImg } from "img";

function Sub() {
  const nav = useNavigate();
  const par = useParams();
  const [changeBool, setChangeBool] = useState(false);

  const nowDate = (id) => {
    const getLocal = localStorage.getItem("arr");
    const json = JSON.parse(getLocal);
    const index = json.findIndex((item) => item.id === id);
    return json[index];
  };

  const subMainDate = nowDate(par.id);
  const [contextChange, setContextChange] = useState(subMainDate.context);

  const playerName = (palyer) => {
    switch (palyer) {
      case "son":
        return "손흥민";
      case "kim":
        return "김민재";
      case "lee":
        return "이강인";
      case "hwang":
        return "황희찬";
      default:
        return console.log("오류");
    }
  };

  const subDel = (id) => {
    const real = window.confirm("삭제하시겠습니까?");
    if (real) {
      const getLocal = localStorage.getItem("arr");
      const json = JSON.parse(getLocal);
      const newArr = json.filter((prev) => prev.id !== id);
      localStorage.setItem("arr", JSON.stringify(newArr));
      nav("/");
    } else {
      return false;
    }
  };

  const subUp = () => {
    setChangeBool(!changeBool);
  };

  const subUpdateMain = () => {
    if (contextChange === subMainDate.context) {
      alert("수정된게 없어요!");
    } else {
      const real = window.confirm("수정하시겠습니까?");
      if (!real) {
        setChangeBool(!changeBool);
        setContextChange(subMainDate.context);
      } else {
        const getLocal = localStorage.getItem("arr");
        const json = JSON.parse(getLocal);
        const index = json.findIndex((item) => item.id === par.id);
        const newArr = [...json];
        newArr[index].context = contextChange;
        localStorage.setItem("arr", JSON.stringify(newArr));
        nav("/");
      }
    }
  };

  const subContextChange = (event) => {
    const newContext = event.target.value;
    setContextChange(newContext);
  };
  return (
    <>
      <BtnStyle
        onClick={() => {
          nav("/");
        }}
      >
        홈으로
      </BtnStyle>
      <BodyStyle>
        <SubMainStyle>
          <SectionStyle>
            <ImgDiv>
              <ImgStyle src={userImg} alt="유저 프로필 이미지" />
            </ImgDiv>
            <NameTime>
              <Name>{subMainDate.name}</Name>
              <span>{subMainDate.time}</span>
            </NameTime>
          </SectionStyle>
          <Name>To.{playerName(subMainDate.player)}</Name>
          {changeBool ? (
            <SubContextInput
              value={contextChange}
              onChange={subContextChange}
            />
          ) : (
            <SubContext>{subMainDate.context}</SubContext>
          )}
          <BtnDiv changeBool={changeBool}>
            <SubBtnUD onClick={subUp}>수정</SubBtnUD>
            <SubBtnUD onClick={() => subDel(subMainDate.id)}>삭제</SubBtnUD>
          </BtnDiv>
          <UpdateComplBtn changeBool={changeBool} onClick={subUpdateMain}>
            수정완료
          </UpdateComplBtn>
        </SubMainStyle>
      </BodyStyle>
    </>
  );
}

export default Sub;

const BodyStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnStyle = styled.button`
  background-color: black;
  color: white;
  width: 100px;
  height: 50px;
  margin: 40px;
  cursor: pointer;
`;

const SubMainStyle = styled.div`
  background-color: #bebebe;
  margin: 30px;
  width: 840px;
  height: 400px;
  padding: 20px;
`;

const NameTime = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin: 28px 0 28px 28px;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const SubContext = styled.div`
  background-color: black;
  width: 800px;
  height: 220px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 30px;
  font-size: 20px;
  line-height: 2.1;
`;

const SubContextInput = styled.input`
  background-color: black;
  width: 800px;
  height: 220px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 30px;
  font-size: 20px;
  color: white;
`;

const BtnDiv = styled.div`
  margin: 5px 0 0 685px;
  display: ${(props) => (props.changeBool ? "none" : "")};
`;
const SubBtnUD = styled.button`
  background-color: black;
  color: white;
  width: 50px;
  height: 30px;
  cursor: pointer;
  margin-right: 5px;
`;

const UpdateComplBtn = styled.button`
  display: ${(props) => (props.changeBool ? "" : "none")};
  background-color: black;
  color: white;
  width: 100px;
  height: 30px;
  cursor: pointer;
  margin: 5px 0 0 685px;
`;
