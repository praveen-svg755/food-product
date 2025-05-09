// src/components/ProductDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../App.css";

const ProductDetails = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=code,product_name,image_url,categories_tags,ingredients_text,nutrition_grades`
        );
        if (response.data && response.data.product) {
          setProduct(response.data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [barcode]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product data available</p>;

  return (
    <div className="product-details-container">
      <Link to="/" className="back-button">
        Back to Home
      </Link>
      <div className="product-details">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.product_name || "Product"}
            className="product-image"
          />
        )}
        <div className="product-info">
          <h2 className="product-name">
            {product.product_name || "No name available"}
          </h2>
          <p className="barcode">
            <strong>Barcode:</strong> {product.code || "No barcode available"}
          </p>
          <p className="category">
            <strong>Category:</strong>{" "}
            {product.categories_tags && product.categories_tags.length > 0
              ? product.categories_tags[0].replace(/^en:/, "").replace(/-/g, " ")
              : "No category available"}
          </p>
          <p className="ingredients">
            <strong>Ingredients:</strong>{" "}
            {product.ingredients_text || "No ingredients available"}
          </p>
          <p className="nutrition">
            <strong>Nutrition Grade:</strong>{" "}
            {product.nutrition_grades || "No grade available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;