import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ImgDiv, ImgStyle, SectionStyle } from "components/Context";
import { useNavigate, useParams } from "react-router-dom";
import { userImg } from "img";
import { useDispatch, useSelector } from "react-redux";
import { letterInstance, loginInstance } from "../axios/api";
import { __fanLatterArray } from "../redux/modules/stateRedux";

function Sub() {
  const [nowLogin, setNotLogin] = useState(false);
  const [changeBool, setChangeBool] = useState(false);

  const fanLatterArr = useSelector((state) => state.stateRedux.fanLatterArr);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const nav = useNavigate();
  const par = useParams();
  const dispatch = useDispatch();

  // 현재 로그인된 정보
  const nowDate = (id) => {
    const index = fanLatterArr.findIndex((item) => item.id === id);
    return fanLatterArr[index];
  };
  const subMainDate = nowDate(par.id);

  const [contextChange, setContextChange] = useState(subMainDate.content);

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

  // 버튼 바뀌는 불리언
  const subUp = () => {
    setChangeBool(!changeBool);
  };

  // 삭제
  const subDel = async (id) => {
    const real = window.confirm("삭제하시겠습니까?");
    if (real) {
      await letterInstance.delete(`/letters/${id}`);
      dispatch(__fanLatterArray());
      nav("/");
    } else {
      return false;
    }
  };

  // 수정
  const subUpdateMain = async (id) => {
    if (contextChange === subMainDate.content) {
      alert("수정된게 없어요!");
    } else {
      const real = window.confirm("수정하시겠습니까?");
      if (!real) {
        setChangeBool(!changeBool);
        setContextChange(subMainDate.content);
      } else {
        await letterInstance.patch(`/letters/${id}`, {
          content: contextChange,
        });
        dispatch(__fanLatterArray());
        nav("/");
      }
    }
  };

  // 내용변경
  const subContextChange = (event) => {
    const newContext = event.target.value;
    setContextChange(newContext);
  };

  // 현재 로그인한 유저 확인
  useEffect(() => {
    const subMaster = async () => {
      try {
        // 유저정보 가져오기
        const response = await loginInstance.get("/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // 상세보기와 현재 로그인정보가 맞는지 비교
        if (subMainDate.userId == response.data.id) {
          setNotLogin(true);
        } else {
          setNotLogin(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    subMaster();
  }, []);

  // 이미지 없을 시 기본 이미지
  const img = (user) => {
    if (user) {
      return user;
    } else {
      return userImg;
    }
  };

  return (
    <>
      <BodyStyle>
        <SubMainStyle>
          <SectionStyle>
            <ImgDiv>
              <ImgStyle
                src={img(subMainDate.avatar)}
                alt="유저 프로필 이미지"
              />
            </ImgDiv>
            <NameTime>
              <Name>{subMainDate.nickname}</Name>
              <span>{subMainDate.createdAt}</span>
            </NameTime>
          </SectionStyle>
          <Name>To.{playerName(subMainDate.player)}</Name>
          {changeBool ? (
            <SubContextInput
              value={contextChange}
              onChange={subContextChange}
            />
          ) : (
            <SubContext>{subMainDate.content}</SubContext>
          )}
          <UserCheck $nowLogin={nowLogin}>
            <BtnDiv $changeBool={changeBool}>
              <SubBtnUD onClick={subUp}>수정</SubBtnUD>
              <SubBtnUD onClick={() => subDel(subMainDate.id)}>삭제</SubBtnUD>
            </BtnDiv>
            <UpdateComplBtn
              $changeBool={changeBool}
              onClick={() => subUpdateMain(subMainDate.id)}
            >
              수정완료
            </UpdateComplBtn>
          </UserCheck>
        </SubMainStyle>
      </BodyStyle>
    </>
  );
}

export default Sub;

const BodyStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://newsimg-hams.hankookilbo.com/2022/12/07/ee1e140e-f6b9-4f65-bc57-4f8fdcfdeecd.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  display: ${(props) => (props.$changeBool ? "none" : "")};
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
  display: ${(props) => (props.$changeBool ? "" : "none")};
  background-color: black;
  color: white;
  width: 100px;
  height: 30px;
  cursor: pointer;
  margin: 5px 0 0 685px;
`;

const UserCheck = styled.div`
  display: ${(props) => (props.$nowLogin ? "" : "none")};
`;
