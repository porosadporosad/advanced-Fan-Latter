const FAN_LATTER_ARR = "FAN_LATTER_ARR";
const COLOR_PLAYER = "COLOR_PLAYER";
const FILTERD_ARR = "FILTERD_ARR";

export const fanLatterArray = (payload) => {
  return {
    type: FAN_LATTER_ARR,
    payload,
  };
};

export const color_player = (payload) => {
  return {
    type: COLOR_PLAYER,
    payload,
  };
};

export const filterd_Arr = () => {
  return {
    type: FILTERD_ARR,
  };
};

export const firstDate = [
  {
    name: "해리케인",
    context: "흥민아 힘내라",
    player: "son",
    time: "2024. 2. 10. 오후 3:55:57",
    id: "1",
  },
  {
    name: "3대째 토트넘팬",
    context: "대 흥 민",
    player: "son",
    time: "2024. 2. 11. 오후 12:16:33",
    id: "2",
  },
  {
    name: "세리에최고수비수",
    context: "뮌헨에서도 화이팅..",
    player: "kim",
    time: "2024. 2. 15. 오전 9:30:56",
    id: "3",
  },
  {
    name: "여진구",
    context: "잘생겨서 배우해도 될듯",
    player: "hwang",
    time: "2024. 2. 18. 오후 10:51:24",
    id: "4",
  },
];
// 초기 상태값
const initialState = {
  fanLatterArr: firstDate,
  colorPlayer: "son",
  filterdArr: [],
};

// 리듀서
const stateRedux = (state = initialState, action) => {
  switch (action.type) {
    case FAN_LATTER_ARR:
      return {
        ...state,
        fanLatterArr: action.payload,
      };
    case COLOR_PLAYER:
      return {
        ...state,
        colorPlayer: action.payload,
      };
    case FILTERD_ARR:
      const arr = state.fanLatterArr.filter(
        (prev) => prev.player === state.colorPlayer
      );
      return {
        ...state,
        filterdArr: arr,
      };
    default:
      return state;
  }
};

export default stateRedux;
