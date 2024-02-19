import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { login } from "../redux/modules/authSlice";
import styled from "styled-components";
import axios from "axios";

function Login() {
  const [changeBool, setChangeBool] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [name, setName] = useState("");
  const [dbLogin, setDbLogin] = useState(null);
  const [register, setRegister] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const dispatch = useDispatch();

  //   const fetchLogin = async () => {
  //     const { data } = await axios.get(
  //       " https://moneyfulpublicpolicy.co.kr/register"
  //     );
  //     // console.log("data", data);
  //     setDbLogin(data);
  //   };
  //   const registerJWT = () => {};
  //   console.log(fetchLogin());
  const registerClick = () => {
    setChangeBool(!changeBool);
  };

  const registerBtnClick = async (e) => {
    e.preventDefault();
    const newRegister = {
      id: registerId,
      password: registerPassword,
      nickname: name,
    };
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        newRegister
      );
      setChangeBool(!changeBool);
      alert("회원가입 성공!");
    } catch (error) {
      alert(error.response.data.message);
      return false;
    }
  };
  const loginBtnClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        { id, password }
      );
      const { accessToken, userId, success, avatar, nickname } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      dispatch(
        login({
          accessToken,
          userId,
          success,
          avatar,
          nickname,
        })
      );
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <LoginBody>
      {changeBool ? (
        //회원가입
        <LoginMain onSubmit={registerBtnClick}>
          <LoginMainH1>회원가입</LoginMainH1>
          <LoginInput
            minLength="4"
            maxLength="10"
            placeholder="아이디 (4~10글자)"
            required
            value={registerId}
            onChange={(e) => {
              setRegisterId(e.target.value);
            }}
          />
          <LoginInput
            minLength="4"
            maxLength="15"
            placeholder="비밀번호 (4~15글자)"
            required
            value={registerPassword}
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          />
          <LoginInput
            minLength="1"
            maxLength="10"
            placeholder="닉네임 (1~10글자)"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <LoginBtnDiv>
            <LoginBtn>회원가입</LoginBtn>
          </LoginBtnDiv>
          <RegisterDiv>
            <RegisterSpan onClick={registerClick}>로그인</RegisterSpan>
          </RegisterDiv>
        </LoginMain>
      ) : (
        //로그인
        <LoginMain onSubmit={loginBtnClick}>
          <LoginMainH1>로그인</LoginMainH1>
          <LoginInput
            minLength="4"
            maxLength="10"
            placeholder="아이디 (4~10글자)"
            required
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <LoginInput
            minLength="4"
            maxLength="15"
            placeholder="비밀번호 (4~15글자)"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <LoginBtnDiv>
            <LoginBtn>로그인</LoginBtn>
          </LoginBtnDiv>
          <RegisterDiv>
            <RegisterSpan onClick={registerClick}>회원가입</RegisterSpan>
          </RegisterDiv>
        </LoginMain>
      )}
    </LoginBody>
  );
}

export default Login;

const LoginBody = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  color: black;
`;

const LoginMain = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px 18px;
  border-radius: 12px;
  background-color: white;
  width: 500px;
`;

const LoginMainH1 = styled.h1`
  font-size: 36px;
  margin-bottom: 36px;
`;

const LoginInput = styled.input`
  margin-bottom: 24px;
  padding: 12px 0px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: initial;
  border-bottom: 1px solid gray;
  outline: none;
`;

const LoginBtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LoginBtn = styled.button`
  background-color: black;
  color: white;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
  padding: 24px 36px;
`;

const RegisterDiv = styled.div`
  text-align: center;
  font-size: 16px;
  color: lightgray;
  margin-top: 24px;
`;

const RegisterSpan = styled.span`
  user-select: none;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
