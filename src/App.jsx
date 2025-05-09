// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ProductDetails from "./components/ProductDetails";
import CategoryPage from "./components/CategoryPage";
import Login from "./components/Login";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:barcode" element={<ProductDetails />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>404 - Page Not Found</p>} />
      </Routes>
    </Router>
  );
};

export default App;