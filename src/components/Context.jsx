import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userImg } from "img";
import { filterd_Arr } from "../redux/modules/stateRedux";

function Context() {
  const colorPlayer = useSelector((state) => state.stateRedux.colorPlayer);
  const filterdArr = useSelector((state) => state.stateRedux.filterdArr);
  const dispatch = useDispatch();
  const { isLoading, error, fanLatterArr } = useSelector((state) => {
    return state.stateRedux;
  });

  // 글자 길이
  const overLength = (overContext) => {
    if (overContext) {
      return overContext.length > 20
        ? overContext.substring(0, 20) + "..."
        : overContext;
    }
    return null;
  };

  // 사진
  const img = (user) => {
    if (user) {
      return user;
    } else {
      return userImg;
    }
  };

  // 팬레터가 없을시
  const playerChange = (item) => {
    switch (item) {
      case "son":
        return "손흥민에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되주세요!";

      case "kim":
        return "김민재에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되주세요!";

      case "lee":
        return "이강인에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되주세요!";

      case "hwang":
        return "황희찬에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되주세요!";
      default:
        return "남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되주세요!";
    }
  };

  useEffect(() => {
    dispatch(filterd_Arr());
  }, [fanLatterArr]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <MainDiv>
      {filterdArr.length !== 0 ? (
        filterdArr.map((prev) => (
          <ContextDiv key={prev.id} to={`/sub/${prev.id}`}>
            <SectionStyle>
              <ImgDiv>
                <ImgStyle src={img(prev.avatar)} alt="유저 프로필 이미지" />
              </ImgDiv>
              <NameTiemDiv>
                <span>{prev.nickname}</span>
                <TimeStyle>{prev.createdAt}</TimeStyle>
              </NameTiemDiv>
            </SectionStyle>
            <ContextStyle>{overLength(prev.content)}</ContextStyle>
          </ContextDiv>
        ))
      ) : (
        <NoneMain>{playerChange(colorPlayer)}</NoneMain>
      )}
    </MainDiv>
  );
}

export default Context;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;

  width: 500px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const ContextDiv = styled(Link)`
  border: 1px solid white;
  width: 440px;
  margin: 20px 0 20px 0;
  border-radius: 5px;
  padding: 20px;
  &:hover {
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
  text-decoration: none; /* 링크에 밑줄 제거 */
  color: inherit; /* 링크 색상을 부모 요소와 동일하게 설정 */
`;

export const SectionStyle = styled.section`
  display: flex;
  flex-direction: row;
`;

export const ImgDiv = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70%;
  overflow: hidden;
`;

export const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NameTiemDiv = styled.div`
  margin: 20px;
`;

const TimeStyle = styled.div`
  margin-top: 10px;
`;

const ContextStyle = styled.p`
  width: 300px;
  height: 30px;
  padding: 8px 0 0 5px;
  margin-left: 90px;
  background-color: #3b3c3d;
  border-radius: 5px;
`;

const NoneMain = styled.div`
  background-color: black;

  width: 500px;
  height: 50px;
  border-radius: 5px;
  text-align: center;
  padding-top: 20px;
`;
