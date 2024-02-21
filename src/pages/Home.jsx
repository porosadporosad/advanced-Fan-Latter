import React, { useEffect } from "react";
import Header from "../components/Header";
import Read from "../components/Read";
import { __fanLatterArray } from "../redux/modules/stateRedux";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem("arr"));
    // arr 로컬스토리지가 있으면 가져오기 없으면 서버에서 가져오기
    if (getLocal) {
      dispatch(__fanLatterArray.fulfilled(getLocal));
    } else {
      dispatch(__fanLatterArray());
    }
  }, []);

  return (
    <>
      <Header />
      <Read />
    </>
  );
}

export default Home;
