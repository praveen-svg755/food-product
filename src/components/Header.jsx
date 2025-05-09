// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  const categories = [
    { display: "Sankes", url: "sankes" },
    { display: "Baked products", url: "baked-products" },
    { display: "Care", url: "care" },
    { display: "Beauty", url: "beauty" },
  ];

  return (
    <div className="header">
      <div className="logo">
        <img
          src="data:image/svg+xml,%3csvg%20width='71'%20height='72'%20viewBox='0%200%2071%2072'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4081_90)'%3e%3crect%20y='36'%20width='50'%20height='50'%20rx='10'%20transform='rotate(-45%200%2036)'%20fill='%230092A6'/%3e%3crect%20width='33'%20height='5'%20transform='translate(9%2020.6447)'%20fill='white'/%3e%3crect%20width='44'%20height='5'%20transform='translate(42%2024.6447)%20rotate(90)'%20fill='white'/%3e%3crect%20width='39'%20height='5'%20transform='translate(29%2028.6447)'%20fill='white'/%3e%3crect%20width='35'%20height='5'%20transform='translate(34%2032.6447)%20rotate(90)'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4081_90'%3e%3crect%20y='36'%20width='50'%20height='50'%20rx='10'%20transform='rotate(-45%200%2036)'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
          alt="Truflect Logo"
        />
        <label className="name">TRUFLECT</label>
      </div>
      <div className="categories">
        {categories.map((category) => (
          <Link
            key={category.url}
            to={`/category/${category.url}`}
            className="c1"
          >
            {category.display}
          </Link>
        ))}
      </div>
      <div className="login">
        <Link to="/login">Login/Signin</Link>
      </div>
    </div>
  );
};

export default Header;