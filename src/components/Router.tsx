import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Products from "../pages/Products";
import PrivateRoute from "./PrivateRoute";

const Router: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/products" element={<PrivateRoute />}>
      <Route index element={<Products />} />
    </Route>
  </Routes>
);

export default Router;