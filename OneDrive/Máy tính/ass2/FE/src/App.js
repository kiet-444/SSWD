
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ListPage from "./pages/Admin/ListPage/ListPage";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import Login from "./pages/Login/login";
import { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./pages/User/HomePage/HomePage";
import SelectMember from "./pages/Login/selectmember";
import BookDetailPage from "./pages/User/BookDetailPage/BookDetailPage";
import SearchPage from "./pages/User/SearchPage/SearchPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
import SuggestionPage from "./pages/SuggestionPage/SuggestionPage";
import Profile from "./pages/Profile/Profile";
import Favorite from "./pages/User/Favor/favor";
import History from "./pages/History/History";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import ListPageBrand from "./pages/Admin/Brand/ListPage";
import ListPageUser from "./pages/Admin/User/ListPage";
import ListPageWatch from "./pages/Admin/Watch/ListPage";
import Detail from "./pages/Detail/Detail";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Homepage />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin/watch/detail/:id"
            element={
              <>
                <Header />
                <Detail />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <Profile />
                <Footer />
              </>
            }
          />
          <Route path="/selectmember/*" element={<SelectMember />} />
          <Route
            path="/login"
            element={
              <>
                <Login func="login" title="user" />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Login func="register" title="user" />
              </>
            }
          />
          <Route path="/admin/">
            <Route path="books/*" element={
              <>
                <Header />
                <ListPage />
              </>} />
            <Route path="watch/*" element={
              <>
                <Header />
                <Detail />
              </>} />


            <Route path="watches/*" element={
              <>
                <Header />
                <ListPageWatch />
              </>} />

            <Route path="users/*" element={
              <>
                <Header />
                <ListPageUser />
              </>} />


            <Route path="brands/*" element={
              <>
                <Header />
                <ListPageBrand />
              </>
            }

            />
            <Route path="dashboard/*" element={
              <>
                <Header />
                <Dashboard />
              </>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
