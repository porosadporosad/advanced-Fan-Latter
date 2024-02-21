import Login from "pages/Login";
import Home from "pages/Home";
import Sub from "pages/Sub";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "pages/Layout";
import Profile from "pages/Profile";
import AuthLayout from "shared/AuthLayout";
import NonAuthLayout from "shared/NonAuthLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NonAuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="sub/:id" element={<Sub />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
