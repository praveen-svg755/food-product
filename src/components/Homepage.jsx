// src/components/Homepage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Added for name search
  const [barcode, setBarcode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://world.openfoodfacts.org/api/v2/search?fields=code,product_name,image_url,categories_tags,ingredients_text,nutrition_grades&sort_by=popularity&page_size=50"
        );
        if (response.data && response.data.products) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
        } else {
          setError("No products found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle product name search
  const handleNameSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setBarcode(""); // Clear barcode input
    setShowScanner(false); // Close scanner
    setError(null);

    if (term.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.product_name?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle manual barcode search
  const handleBarcodeSearch = async (e) => {
    const code = e.target.value;
    setBarcode(code);
    setSearchTerm(""); // Clear name search
    setShowScanner(false); // Close scanner
    setError(null);

    if (code.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v2/product/${code}?fields=code,product_name,image_url,categories_tags,ingredients_text,nutrition_grades`
      );
      if (response.data && response.data.product) {
        setFilteredProducts([response.data.product]);
      } else {
        setFilteredProducts([]);
        setError("No product found for this barcode");
      }
    } catch (err) {
      console.error("Barcode fetch error:", err);
      setFilteredProducts([]);
      setError("Failed to fetch product by barcode");
    } finally {
      setLoading(false);
    }
  };

  // Handle barcode scan from camera
  const handleScan = async (err, result) => {
    console.log("handleScan called", { err, result });
    if (err) {
      if (err.name === "NotAllowedError") {
        setError("Camera access denied. Please allow camera permissions.");
      } else {
        setError(`Camera error: ${err.message}`);
      }
      return;
    }
    if (result) {
      const code = result.text;
      setBarcode(code);
      setSearchTerm(""); // Clear name search
      setShowScanner(false);
      navigate(`/product/${code}`); // Navigate to product details
    }
  };

  // Toggle scanner visibility
  const toggleScanner = () => {
    console.log("Toggling scanner, current state:", showScanner);
    setShowScanner(!showScanner);
    setSearchTerm(""); // Clear name search
    setBarcode(""); // Clear barcode
    setError(null);
    setFilteredProducts(products);
  };

  if (loading) return <p>Loading...</p>;
  if (error && filteredProducts.length === 0) return <p>{error}</p>;

  return (
    <div className="products-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={handleNameSearch}
          className="search-input name-search"
        />
        <input
          type="text"
          placeholder="Search by barcode..."
          value={barcode}
          onChange={handleBarcodeSearch}
          className="search-input barcode-search"
        />
        <button onClick={toggleScanner} className="scanner-button">
          {showScanner ? "Close Scanner" : "Scan Barcode"}
        </button>
      </div>
      {showScanner && (
        <div className="scanner-container">
          <p>Camera should appear below:</p>
          <BarcodeScannerComponent
            width="100%"
            height="300px"
            onUpdate={handleScan}
          />
        </div>
      )}
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Link
              to={`/product/${product.code}`}
              key={index}
              className="product-card"
              style={{ textDecoration: "none" }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.product_name || "Product"}
                  className="product-image"
                />
              )}
              <div className="product-info">
                <h3 className="product-name">
                  {product.product_name || "No name available"}
                </h3>
                <p className="category">
                  Category:{" "}
                  {product.categories_tags && product.categories_tags.length > 0
                    ? product.categories_tags[0]
                        .replace(/^en:/, "")
                        .replace(/-/g, " ")
                    : "No category available"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;