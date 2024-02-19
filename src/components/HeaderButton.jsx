import React from "react";
import styled from "styled-components";
import { color_player, filterd_Arr } from "../redux/modules/stateRedux";
import { btn_Color, click_Main_Color } from "../redux/modules/colorChange";
import { useDispatch, useSelector } from "react-redux";

function HeaderButton({ player, children }) {
  const dispatch = useDispatch();
  const btnColor = useSelector((state) => state.colorChange.btnColor);
  const clickMainColor = useSelector(
    (state) => state.colorChange.clickMainColor
  );

  const onClickPlayer = (name) => {
    clickbtnColor(name);
    dispatch(color_player(name));

    dispatch(click_Main_Color(name));
    dispatch(filterd_Arr());
  };

  const clickbtnColor = (player) => {
    const updatedColors = {
      son: "black",
      kim: "black",
      lee: "black",
      hwang: "black",
    };
    updatedColors[player] = "yellow";

    dispatch(btn_Color(updatedColors));
  };

  return (
    <HeaderBtn
      backgroundColor={btnColor[player]}
      mainColor={clickMainColor === player}
      onClick={() => onClickPlayer(player)}
    >
      {children}
    </HeaderBtn>
  );
}

export default HeaderButton;

const HeaderBtn = styled.button`
  border: 1px solid black;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => (props.mainColor ? "black" : "white")};
  width: 100px;
  height: 40px;
  margin: 10px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: yellow;
    color: black;
  }
`;
