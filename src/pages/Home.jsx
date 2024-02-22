import React, { useEffect } from "react";
import Header from "../components/Header";
import Read from "../components/Read";
import { __fanLatterArray } from "../redux/modules/stateRedux";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__fanLatterArray());
  }, []);

  return (
    <>
      <Header />
      <Read />
    </>
  );
}

export default Home;
