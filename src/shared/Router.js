import Home from "pages/Home";
import Sub from "pages/Sub";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sub/:id" element={<Sub />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
