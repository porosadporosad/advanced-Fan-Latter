import React, { useState } from "react";
import styled from "styled-components";
import Context from "./Context";
import { fanLatterArray } from "../redux/modules/stateRedux";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Read() {
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [player, setPlayer] = useState("son");

  const fanLatterArr = useSelector((state) => state.stateRedux.fanLatterArr);
  const dispatch = useDispatch();

  const submitFanletter = (event) => {
    event.preventDefault();
    const time = () => {
      const date = new Date();
      const test = date.toLocaleString();
      return test;
    };
    const newContext = {
      name: name,
      context: context,
      player: player,
      time: time(),
      id: uuidv4(),
    };
    const newArr = [...fanLatterArr, newContext];
    localStorage.setItem("arr", JSON.stringify(newArr));
    const getLocal = localStorage.getItem("arr");
    const json = JSON.parse(getLocal);
    dispatch(fanLatterArray(json));
    setContext("");
    setName("");
  };

  return (
    <MainDiv>
      <ReadInput>
        <form onSubmit={submitFanletter}>
          <div>
            닉네임:{" "}
            <NameInputStyle
              required
              placeholder="최대 20글자까지 작성할 수 있습니다."
              maxLength="20"
              value={name}
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <InputLabel>내용:</InputLabel>
            <ContextInputStyle
              required
              placeholder="최대 100자까지만 작성할 수 있습니다."
              value={context}
              maxLength="100"
              type="text"
              onChange={(event) => {
                setContext(event.target.value);
              }}
            />
          </div>
          <SelectDiv>
            누구에게 보내실 건가요?
            <SelectStyle
              value={player}
              onChange={(event) => {
                setPlayer(event.target.value);
              }}
            >
              <option value="son">손흥민</option>
              <option value="kim">김민재</option>
              <option value="lee">이강인</option>
              <option value="hwang">황희찬</option>
            </SelectStyle>
          </SelectDiv>
          <BtnDiv>
            <BtnStyle type="submit">팬레터 등록</BtnStyle>
          </BtnDiv>
        </form>
      </ReadInput>
      <Context />
    </MainDiv>
  );
}

export default Read;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReadInput = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 240px;
  justify-content: center;
  align-items: center;
  background-color: #bebebe;
  border-radius: 10px;
  margin: 20px;
  color: black;
`;

const NameInputStyle = styled.input`
  width: 400px;
  height: 28px;
  margin-bottom: 10px;
`;

const ContextInputStyle = styled.input`
  width: 400px;
  height: 84px;
`;

const InputLabel = styled.label`
  margin-right: 18px;
`;

const SelectDiv = styled.div`
  margin: 10px 10px 10px 0;
`;
const SelectStyle = styled.select`
  margin-left: 30px;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BtnStyle = styled.button`
  background-color: black;
  color: white;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: yellow;
    color: black;
  }
`;
