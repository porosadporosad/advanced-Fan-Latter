import { loginInstance } from "../axios/api";
import { userImg } from "img";
import React, { useState } from "react";
import styled from "styled-components";

function Profile() {
  const avatar = JSON.parse(localStorage.getItem("avatar"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const nickname = JSON.parse(localStorage.getItem("nickname"));
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const [update, setUpdate] = useState(false);
  const [name, setName] = useState(nickname);
  const [imgChange, setImgChange] = useState(avatar);
  const [fileChange, setFileChange] = useState(avatar);

  // 버튼 바뀌는 불리언
  const updateBtn = () => {
    setUpdate(!update);
  };

  // 이미지
  const img = (user) => {
    if (user !== null) {
      return user;
    } else {
      return userImg;
    }
  };

  // 취소할시
  const notUpdateBtn = () => {
    setName(nickname);
    setImgChange(avatar);
    setUpdate(!update);
  };
  const profileImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      // 서버에 보낼 파일
      setFileChange(file);
      reader.onload = () => {
        const url = reader.result;
        // 현 페이지에서 이미지 보이게
        setImgChange(url);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 바꾸기
  const updateImgNameBtn = async () => {
    // 이미지, 닉네임 변경내용
    const formData = new FormData();
    formData.append("avatar", fileChange);
    formData.append("nickname", name);
    try {
      // 프로필, 닉네임 변경 보내기
      const response = await loginInstance.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 유저 정보 가져오기
      const responseLogin = await loginInstance.get("/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // 변경된 내용 로컬스토리지에 추가
      const newAvatar = responseLogin.data.avatar;
      const newNickname = responseLogin.data.nickname;
      localStorage.setItem("avatar", JSON.stringify(newAvatar));
      localStorage.setItem("nickname", JSON.stringify(newNickname));

      alert("변경되었습니다");
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileBody>
      <ProfileMain>
        <ProfileH1>프로필 관리</ProfileH1>
        <ProfileDiv>
          <ProfileImgDiv>
            {update ? (
              <ProfileInputDiv>
                <ProfileImg src={img(imgChange)} alt="프로필이미지" />{" "}
                <ProfileImgInput
                  type="file"
                  accept="image/*"
                  onChange={profileImgChange}
                />
              </ProfileInputDiv>
            ) : (
              <ProfileImg src={img(imgChange)} alt="프로필이미지"></ProfileImg>
            )}
          </ProfileImgDiv>
        </ProfileDiv>
        {update ? (
          <ProfileInput
            value={name}
            required
            minLength={1}
            maxLength={10}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <ProfileName>{nickname}</ProfileName>
        )}
        <ProfileUserId>{userId}</ProfileUserId>
        {update ? (
          <ProfileUpdateDiv>
            <ProfileBtn onClick={notUpdateBtn}>취소</ProfileBtn>
            <ProfileBtn onClick={updateImgNameBtn}>수정완료</ProfileBtn>
          </ProfileUpdateDiv>
        ) : (
          <ProfileBtn onClick={updateBtn}>수정하기</ProfileBtn>
        )}
      </ProfileMain>
    </ProfileBody>
  );
}

export default Profile;

const ProfileBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: black;
  background-image: url("https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/241196561_10160513461293836_1312667277312136766_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=783fdb&_nc_ohc=5S-d21cpLQsAX_qjfTW&_nc_ht=scontent-ssn1-1.xx&oh=00_AfAgVo5O86yH0OrEU7sSocY5yVs3G7AKiXN-f-j8PSxo9g&oe=65DA6AFF");
  background-position: center;
`;
const ProfileMain = styled.div`
  width: 500px;
  background-color: #ff607e;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  border-radius: 12px;
`;
const ProfileH1 = styled.h1`
  font-size: 36px;
  font-weight: 700;
`;

const ProfileDiv = styled.div`
  margin: 0px;
  padding: 0px;
  border: 0px;
  font: inherit;
  vertical-align: baseline;
`;

const ProfileImgDiv = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileImgInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ProfileName = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const ProfileUserId = styled.span`
  font-size: 18px;
`;

const ProfileBtn = styled.button`
  background-color: black;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: auto;
  padding: 6px 12px;
  border-radius: 1rem;
  border: none;
`;

const ProfileInput = styled.input`
  outline: none;
  padding: 12px;
`;

const ProfileUpdateDiv = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const ProfileInputDiv = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
`;
