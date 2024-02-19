import Login from "components/Login";
import Pofile from "components/Pofile";
import Home from "pages/Home";
import Sub from "pages/Sub";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  const nowLoginOn = useSelector((state) => state.authSlice.loginNow.success);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={nowLoginOn ? <Home /> : <Login />} />
        <Route path="sub/:id" element={<Sub />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/pofile" element={<Pofile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
