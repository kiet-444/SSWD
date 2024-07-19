import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import "react-toastify/dist/ReactToastify.css";
import HasAuth from "hook/HasAuth";
import GoogleCallback from "views/auth/GoogleCallback";
import Home from "components/homepage/Home";
import ProductDetail from "components/products/ProductDetail";
import Cart from "components/cart/Cart";
import Checkout from "components/checkout/Checkout";
import ProtectedRoute from "hook/getRole";
import Error404 from "views/admin/marketplace/pages/Error404page/Error404";
import Success from "components/checkout/Success";
import OrderList from "components/checkout/OrderList";
import OrderDetail from "components/checkout/OrderDetail";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="/authGoogle" element={<GoogleCallback />} />

      <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route path="admin/*" element={<AdminLayout />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["Admin", "staff"]} />}>
        <Route path="rtl/*" element={<RtlLayout />} />
        <Route path="home/*" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
      </Route>

      <Route path="/404" element={<Error404 />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
};

export default App;
